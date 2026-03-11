import { NextRequest, NextResponse } from "next/server";
import { creators } from "@/lib/creators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recruiterId,
      is18Plus,
      isUSCA,
      streamingCountry,
      contentTypes,
      otherContentType,
      nicheDescription,
      liveFrequency,
      averageSessionLength,
      streamingDuration,
      streamingGoals,
      improvements,
      otherImprovement,
      followerCount,
      receivesGifts,
      biggestChallenge,
      openToCoaching,
      otherAgency,
      otherAgencyName,
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

    // Format improvements
    let improvementsString = "None";
    if (improvements && Array.isArray(improvements)) {
      improvementsString = improvements.join(", ");
    }
    if (otherImprovement) {
      improvementsString += ` (Other: ${otherImprovement})`;
    }

    // Location display
    const locationDisplay = isUSCA === "Yes" ? "US/CA" : `International (${streamingCountry || "Unknown"})`;

    // Agency status display
    const agencyDisplay = otherAgency === "Yes" ? `Currently in Agency: ${otherAgencyName}` : "Not in an agency";

    // Prepare Discord Webhook Payload
    const embed = {
      title: "🚀 New Creator Intake Form Submitted!",
      color: 0xE11D48, // Primary color hex
      description: `A new creator has applied to join **Peace Time Agency**.`,
      fields: [
        {
          name: "👤 General",
          value: `**TikTok Handle:** ${tiktokHandle}\n**18+:** ${is18Plus}\n**Location:** ${locationDisplay}\n**Followers:** ${followerCount}`,
          inline: false
        },
        {
          name: "Contact Info",
          value: `**Discord:** ${discordDisplay}\n**Email:** ${emailDisplay}`,
          inline: true
        },
        {
          name: "Agency Status",
          value: agencyDisplay,
          inline: true
        },
        {
          name: "📱 Content Details",
          value: `**Content Types:** ${contentTypesString}\n**Niche/Style:** ${nicheDescription}`,
          inline: false
        },
        {
          name: "🎥 LIVE Experience",
          value: `**Duration:** ${streamingDuration}\n**Frequency:** ${liveFrequency}\n**Avg Session:** ${averageSessionLength}\n**Receives Gifts:** ${receivesGifts}`,
          inline: false
        },
        {
          name: "🎯 Goals & Challenges",
          value: `**Goals:** ${streamingGoals}\n**Improvements:** ${improvementsString}\n**Challenge:** ${biggestChallenge}\n**Open to Coaching:** ${openToCoaching}`,
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
