import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const AGENCY_EMAIL = process.env.AGENCY_EMAIL || "applications@peacetimeagency.com";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, tiktok, followers, goals, discord, tiktokProfile } = body;

    const discordDisplay = discord || "Not Provided";
    const creatorName = name || tiktokProfile?.display_name || "Unknown Creator";

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #E11D48; border-bottom: 2px solid #E11D48; padding-bottom: 10px;">
          🚀 New Talent Application
        </h2>
        <p>A new creator has applied to join <strong>Peace Time Agency</strong>.</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #555;">👤 Creator Information</h3>
          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          <p><strong>Discord:</strong> ${discordDisplay}</p>
        </div>

        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #555;">📱 TikTok Presence</h3>
          <p><strong>Handle:</strong> ${tiktok || "N/A"}</p>
          <p><strong>Followers:</strong> ${followers || "N/A"}</p>
          ${tiktokProfile ? `
            <p><strong>Verified Name:</strong> ${tiktokProfile.display_name}</p>
            <p><strong>Open ID:</strong> <code>${tiktokProfile.open_id}</code></p>
          ` : ""}
        </div>

        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #555;">🎯 The Vision (6-Month Goals)</h3>
          <p style="white-space: pre-wrap;">${goals || "No goals provided."}</p>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
          Peace Time Agency • Talent Intake System
        </p>
      </div>
    `;

    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Mocking email submission for development.");
      console.log("Mock Email Submission HTML:\\n", emailHtml);
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({ success: true, message: "Mock submission successful" });
    }

    const data = await resend.emails.send({
      from: "Agency Inbox <onboarding@resend.dev>",
      to: [AGENCY_EMAIL],
      subject: `New Application: ${creatorName}`,
      html: emailHtml,
    });

    if (data.error) {
       throw new Error(`Resend Error: ${data.error.message}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
