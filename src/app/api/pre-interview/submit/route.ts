import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const AGENCY_EMAIL = process.env.AGENCY_EMAIL || "applications@peacetimeagency.com";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, tiktok, email } = body;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #E11D48; border-bottom: 2px solid #E11D48; padding-bottom: 10px;">
          👀 Pre-Interview Request
        </h2>
        <p>A creator has requested a pre-interview discussion with <strong>Peace Time Agency</strong>.</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #555;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>TikTok Handle:</strong> ${tiktok}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
          Peace Time Agency • Talent Intake System
        </p>
      </div>
    `;

    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Mocking email submission for development.");
      console.log("Mock Pre-Interview Email:\\n", emailHtml);
      await new Promise(r => setTimeout(r, 800));
      return NextResponse.json({ success: true, message: "Mock submission successful" });
    }

    const data = await resend.emails.send({
      from: "Agency Intake <onboarding@resend.dev>",
      to: [AGENCY_EMAIL],
      subject: `Pre-Interview: ${name} (${tiktok})`,
      html: emailHtml,
    });

    if (data.error) {
       throw new Error(`Resend Error: ${data.error.message}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit request." },
      { status: 500 }
    );
  }
}
