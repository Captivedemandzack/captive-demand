import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

import { parseAnnualCompanyRevenue, revenueLabel } from '@/lib/annual-company-revenue';

type Body = {
  fullName?: string;
  name?: string;
  email?: string;
  businessName?: string;
  /** `AnnualCompanyRevenue` when from our forms */
  annualCompanyRevenue?: string;
  service?: string;
  budget?: string;
  message?: string;
  /** @deprecated pricing modal no longer sends tier */
  tier?: string;
  recaptchaToken?: string;
  source?: string;
};

/** Always CC this address on lead emails (override with LEAD_CC_EMAIL). */
const DEFAULT_LEAD_CC = 'zachary@captivedemand.com';

function leadCcEmail(): string {
  return process.env.LEAD_CC_EMAIL?.trim() || DEFAULT_LEAD_CC;
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '');
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT ?? '465');
  const secureFlag = process.env.SMTP_SECURE;
  const secure =
    secureFlag === 'true' ? true : secureFlag === 'false' ? false : port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function formatLeadBody(params: {
  name: string;
  businessName: string;
  annualRevenueLabel: string;
  replyEmail: string;
  extra?: string;
}): string {
  const lines = [
    `Name: ${params.name}`,
    `Business Name: ${params.businessName}`,
    `Annual Company Revenue: ${params.annualRevenueLabel}`,
    `Reply-to email: ${params.replyEmail}`,
  ];
  if (params.extra?.trim()) {
    lines.push('', params.extra.trim());
  }
  return lines.join('\n');
}

async function sendLeadToCeo(
  transporter: nodemailer.Transporter,
  params: { subject: string; text: string },
): Promise<void> {
  const fromAddr = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const ceo = process.env.CEO_EMAIL?.trim();
  const cc = leadCcEmail();

  if (!ceo) {
    console.warn('CEO_EMAIL is not set; sending lead only to CC address.');
    await transporter.sendMail({
      from: fromAddr,
      to: cc,
      subject: `${params.subject} [CEO_EMAIL not configured]`,
      text: params.text,
    });
    return;
  }

  await transporter.sendMail({
    from: fromAddr,
    to: ceo,
    cc,
    subject: params.subject,
    text: params.text,
  });
}

async function verifyRecaptcha(token: string): Promise<{ ok: boolean }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true };

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success?: boolean; score?: number };
  if (!data.success) return { ok: false };
  if (typeof data.score === 'number' && data.score < 0.5) return { ok: false };
  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const email = body.email?.trim();
    const displayName = (body.name ?? body.fullName)?.trim();
    const businessName = body.businessName?.trim();
    const revenueParsed = parseAnnualCompanyRevenue(body.annualCompanyRevenue);
    const isPricingModal = body.source === 'pricing_modal';

    if (!displayName || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    if (!businessName) {
      return NextResponse.json({ error: 'Business name is required' }, { status: 400 });
    }

    if (!revenueParsed) {
      return NextResponse.json({ error: 'Annual company revenue is required' }, { status: 400 });
    }

    const annualRevenueLabel = revenueLabel(revenueParsed);

    const skipRecaptcha =
      process.env.SKIP_RECAPTCHA_VERIFICATION === 'true' ||
      process.env.NEXT_PUBLIC_SKIP_RECAPTCHA === 'true';

    if (isPricingModal && !skipRecaptcha) {
      const secret = process.env.RECAPTCHA_SECRET_KEY;
      const token = body.recaptchaToken?.trim() ?? '';
      if (secret) {
        if (!token) {
          return NextResponse.json({ error: 'reCAPTCHA required' }, { status: 400 });
        }
        const v = await verifyRecaptcha(token);
        if (!v.ok) {
          return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });
        }
      }
    }

    const transporter = getTransport();

    if (transporter) {
      if (isPricingModal) {
        const text = formatLeadBody({
          name: displayName,
          businessName,
          annualRevenueLabel,
          replyEmail: email,
        });
        try {
          await sendLeadToCeo(transporter, {
            subject: 'New lead — Pricing (Captive Demand)',
            text,
          });
        } catch (mailErr) {
          console.error('Pricing lead: email send failed (user still allowed to continue):', mailErr);
        }
      } else {
        const extraLines = [
          body.service ? `Service: ${body.service}` : '',
          body.budget ? `Budget: ${body.budget}` : '',
          body.message ? `Message:\n${body.message}` : '',
        ]
          .filter(Boolean)
          .join('\n\n');

        const text = formatLeadBody({
          name: displayName,
          businessName,
          annualRevenueLabel,
          replyEmail: email,
          extra: extraLines || undefined,
        });

        try {
          await sendLeadToCeo(transporter, {
            subject: `New lead — Contact form: ${displayName}`,
            text,
          });
        } catch (mailErr) {
          console.error('Contact form: email send failed:', mailErr);
          return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }
      }
    } else if (isPricingModal) {
      console.warn('Pricing lead accepted; configure SMTP + CEO_EMAIL to send mail.', {
        displayName,
        email,
        businessName,
        annualCompanyRevenue: annualRevenueLabel,
      });
    } else {
      console.log('Contact form (no SMTP):', {
        displayName,
        email,
        businessName,
        annualCompanyRevenue: annualRevenueLabel,
      });
    }

    return NextResponse.json({
      success: true,
      ...(isPricingModal
        ? { qualifiesForBooking: revenueParsed === '500k_1m' || revenueParsed === '1m_plus' }
        : {}),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
