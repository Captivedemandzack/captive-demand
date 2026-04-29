#!/usr/bin/env node
// One-shot optimizer for oversized PNGs in /public.
// - Resizes any PNG larger than --threshold-bytes to max --max-width pixels wide
// - Re-encodes as PNG with palette compression
// - Backs up the original file to /public/.image-originals/<filename>
// - Skips files that have already been backed up (idempotent)
//
// Usage: node scripts/optimize-public-images.mjs [--dry] [--max-width=1600] [--threshold-mb=1]

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public");
const BACKUP_DIR = path.join(ROOT, ".image-originals");

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.replace(/^--/, "").split("=");
      return [k, v ?? true];
    })
);

const DRY = Boolean(args.dry);
const MAX_WIDTH = Number(args["max-width"] ?? 1600);
const THRESHOLD_BYTES = Math.round(Number(args["threshold-mb"] ?? 1) * 1024 * 1024);

const fmtBytes = (n) => {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(2)} MB`;
  if (n > 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${n} B`;
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processFile(absPath) {
  const stat = await fs.stat(absPath);
  if (!stat.isFile()) return null;
  if (stat.size < THRESHOLD_BYTES) return null;

  const base = path.basename(absPath);
  const backupPath = path.join(BACKUP_DIR, base);

  let alreadyBackedUp = false;
  try {
    await fs.access(backupPath);
    alreadyBackedUp = true;
  } catch {
    // not backed up yet
  }

  const meta = await sharp(absPath).metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;

  let pipeline = sharp(absPath);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  pipeline = pipeline.png({
    compressionLevel: 9,
    palette: true,
    quality: 90,
    effort: 9,
  });

  const out = await pipeline.toBuffer();

  if (out.length >= stat.size) {
    return {
      file: base,
      action: "skipped (no improvement)",
      before: stat.size,
      after: out.length,
      width: meta.width,
      newWidth: needsResize ? MAX_WIDTH : meta.width,
    };
  }

  if (DRY) {
    return {
      file: base,
      action: "would optimize",
      before: stat.size,
      after: out.length,
      width: meta.width,
      newWidth: needsResize ? MAX_WIDTH : meta.width,
    };
  }

  if (!alreadyBackedUp) {
    await ensureDir(BACKUP_DIR);
    await fs.copyFile(absPath, backupPath);
  }
  await fs.writeFile(absPath, out);

  return {
    file: base,
    action: alreadyBackedUp ? "re-optimized" : "optimized",
    before: stat.size,
    after: out.length,
    width: meta.width,
    newWidth: needsResize ? MAX_WIDTH : meta.width,
  };
}

async function main() {
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  const candidates = entries
    .filter((e) => e.isFile() && /\.png$/i.test(e.name))
    .map((e) => path.join(ROOT, e.name));

  const results = [];
  for (const file of candidates) {
    try {
      const res = await processFile(file);
      if (res) results.push(res);
    } catch (err) {
      results.push({ file: path.basename(file), action: `ERROR: ${err.message}` });
    }
  }

  let savedTotal = 0;
  let beforeTotal = 0;
  for (const r of results) {
    if (typeof r.before === "number" && typeof r.after === "number") {
      beforeTotal += r.before;
      savedTotal += r.before - r.after;
    }
  }

  results.sort((a, b) => (b.before ?? 0) - (a.before ?? 0));
  console.log(
    [
      `Mode:           ${DRY ? "DRY-RUN" : "WRITE"}`,
      `Threshold:      >= ${fmtBytes(THRESHOLD_BYTES)}`,
      `Max width:      ${MAX_WIDTH}px`,
      `Files touched:  ${results.length}`,
      `Total before:   ${fmtBytes(beforeTotal)}`,
      `Total saved:    ${fmtBytes(savedTotal)}`,
      "",
    ].join("\n")
  );

  for (const r of results) {
    if (typeof r.before !== "number") {
      console.log(`- ${r.file}: ${r.action}`);
      continue;
    }
    const pct = r.before > 0 ? Math.round((1 - r.after / r.before) * 100) : 0;
    const sizing = r.width !== r.newWidth ? `${r.width} -> ${r.newWidth}px` : `${r.width}px`;
    console.log(
      `- ${r.file.padEnd(36)} ${sizing.padEnd(16)} ${fmtBytes(r.before).padStart(10)} -> ${fmtBytes(
        r.after
      ).padStart(10)} (${pct}% smaller) [${r.action}]`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
