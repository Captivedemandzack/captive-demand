import sharp from 'sharp';
import { stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

/** Showcase renders ~560px wide, object-cover object-top — cap width + top crop. */
const JOBS = [
  {
    input: 'Agentis-home-before.png',
    output: 'Agentis-home-before.webp',
    width: 1200,
    maxHeight: 3200,
  },
  {
    input: 'Agentis-Home-New.png',
    output: 'Agentis-Home-New.webp',
    width: 1200,
    maxHeight: 3200,
  },
  {
    input: 'Mantality-home-old.png',
    output: 'Mantality-home-old.webp',
    width: 800,
    maxHeight: 2800,
  },
  {
    input: 'mantality-home-new.png',
    output: 'mantality-home-new.webp',
    width: 1200,
    maxHeight: 3200,
  },
];

async function optimizeJob({ input, output, width, maxHeight }) {
  const inputPath = path.join(PUBLIC, input);
  const outputPath = path.join(PUBLIC, output);

  const meta = await sharp(inputPath).metadata();
  const sourceWidth = meta.width ?? width;
  const sourceHeight = meta.height ?? maxHeight;
  const targetWidth = Math.min(width, sourceWidth);
  const scaledHeight = Math.round(sourceHeight * (targetWidth / sourceWidth));
  const targetHeight = Math.min(maxHeight, scaledHeight);

  await sharp(inputPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .extract({ left: 0, top: 0, width: targetWidth, height: targetHeight })
    .webp({ quality: 82, effort: 6 })
    .toFile(outputPath);

  const [before, after] = await Promise.all([stat(inputPath), stat(outputPath)]);
  const saved = ((1 - after.size / before.size) * 100).toFixed(1);
  console.log(`${input} → ${output}: ${formatBytes(before.size)} → ${formatBytes(after.size)} (${saved}% smaller)`);
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

for (const job of JOBS) {
  await optimizeJob(job);
}

for (const job of JOBS) {
  await unlink(path.join(PUBLIC, job.input));
  console.log(`Removed ${job.input}`);
}
