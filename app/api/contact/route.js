import { SITE } from "@/lib/services";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength = 2000) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return clean(value, 4000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildMailto(lead) {
  const subject = encodeURIComponent(`New Devibi project enquiry from ${lead.name || lead.email}`);
  const body = encodeURIComponent(
    [
      `Name: ${lead.name || "Not provided"}`,
      `Email: ${lead.email}`,
      `Services: ${lead.services.length ? lead.services.join(", ") : "Not selected"}`,
      `Budget: ${lead.budget || "Not selected"}`,
      `Source: ${lead.source || "Direct"}`,
      "",
      "Project details:",
      lead.message || "Not provided",
    ].join("\n")
  );

  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

async function sendWebhook(lead) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return { configured: false };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Webhook returned ${response.status}`);
  }

  return { configured: true };
}

async function sendResendEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { configured: false };

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Devibi <onboarding@resend.dev>";
  const html = `
    <h2>New Devibi project enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name || "Not provided")}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Services:</strong> ${lead.services.length ? escapeHtml(lead.services.join(", ")) : "Not selected"}</p>
    <p><strong>Budget:</strong> ${escapeHtml(lead.budget || "Not selected")}</p>
    <p><strong>Source:</strong> ${escapeHtml(lead.source || "Direct")}</p>
    <p><strong>Page:</strong> ${escapeHtml(lead.pagePath || "Unknown")}</p>
    <h3>Project details</h3>
    <p>${escapeHtml(lead.message || "Not provided").replace(/\n/g, "<br />")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `New Devibi project enquiry from ${lead.name || lead.email}`,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}`);
  }

  return { configured: true };
}

export async function POST(request) {
  let body = {};

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 180),
    services: Array.isArray(body.services) ? body.services.map((s) => clean(s, 80)).filter(Boolean) : [],
    budget: clean(body.budget, 80),
    message: clean(body.message, 4000),
    source: clean(body.source, 160),
    pagePath: clean(body.pagePath, 300),
    submittedAt: new Date().toISOString(),
  };

  if (!emailPattern.test(lead.email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const webhook = await sendWebhook(lead);
    const email = await sendResendEmail(lead);

    if (!webhook.configured && !email.configured) {
      return Response.json(
        {
          ok: false,
          error: "Automatic delivery is not configured yet. Use the prefilled email fallback.",
          mailto: buildMailto(lead),
        },
        { status: 503 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return Response.json(
      {
        ok: false,
        error: "We could not send this automatically. Use the prefilled email fallback.",
        mailto: buildMailto(lead),
      },
      { status: 502 }
    );
  }
}
