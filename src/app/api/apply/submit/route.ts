import { NextRequest, NextResponse } from "next/server";
import { creators } from "@/lib/creators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recruiterId,
      is18Plus,
      isUSCA,
      contentTypes,
      otherContentType,
      nicheDescription,
      liveFrequency,
      averageSessionLength,
      tiktokHandle,
      discordId,
      emailAddress,
      additionalNotes
    } = body;

    // Master webhook for all applications
    const webhookUrl = "https://discord.com/api/webhooks/1481203208830455890/XKAAcnGVAjbNpcXNWcLU7EvW05e1gx1Jz9CoofZb4NHDqPmd4xkTUrOckEPIQxMaxAm2";

    const discordDisplay = discordId || "Not Provided";
    const emailDisplay = emailAddress || "Not Provided";

    // Format the selected content types
    let contentTypesString = "None";
    if (contentTypes && Array.isArray(contentTypes)) {
      contentTypesString = contentTypes.join(", ");
    }
    if (otherContentType) {
      contentTypesString += ` (Other: ${otherContentType})`;
    }

    // Prepare Discord Webhook Payload
    const embed = {
      title: "🚀 New Creator Intake Form Submitted!",
      color: 0xE11D48, // Primary color hex
      description: `A new creator has applied to join **Peace Time Agency**.`,
      fields: [
        {
          name: "👤 General",
          value: `**TikTok Handle:** ${tiktokHandle}\n**18+:** ${is18Plus}\n**Location (US/CA):** ${isUSCA}`,
          inline: false
        },
        {
          name: "Contact Info",
          value: `**Discord:** ${discordDisplay}\n**Email:** ${emailDisplay}`,
          inline: false
        },
        {
          name: "📱 Content Details",
          value: `**Content Types:** ${contentTypesString}\n**Niche/Style:** ${nicheDescription}`,
          inline: false
        },
        {
          name: "🎥 LIVE Habits",
          value: `**Frequency:** ${liveFrequency}\n**Avg Session Length:** ${averageSessionLength}`,
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Peace Time Agency • Talent Intake System",
      }
    };

    if (additionalNotes) {
      embed.fields.push({
        name: "📝 Additional Notes",
        value: additionalNotes,
        inline: false
      });
    }

    const discordPayload = {
      embeds: [embed]
    };

    // Send the POST request to the Discord Webhook
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      console.error("Discord Webhook Error:", discordResponse.status, discordResponse.statusText);
      const errorText = await discordResponse.text();
      console.error("Discord Response details:", errorText);
      throw new Error(`Discord Webhook failed with status ${discordResponse.status}`);
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
