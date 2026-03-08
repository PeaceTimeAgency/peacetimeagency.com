import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, tiktok, followers, goals, discord, tiktokProfile } = body;

    if (!DISCORD_WEBHOOK_URL) {
      console.warn("DISCORD_WEBHOOK_URL is not set. Mocking success for development.");
      // In development/mock mode, we'll just log and return success
      console.log("Mock Discord Submission:", body);
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({ success: true, message: "Mock submission successful" });
    }

    const discordDisplay = discord 
      ? (/^\d+$/.test(discord) ? `<@${discord}>` : discord)
      : "Not Provided";

    // Format the Discord message with an embed for a "Black Label" premium feel
    const embed: any = {
      title: "🚀 New Talent Application",
      description: `A new creator has applied to join **Peace Time Agency**.`,
      color: 0xE11D48, // Vivid coral/rose color (matches Brand Primary)
      fields: [
        {
          name: "👤 Creator Information",
          value: `**Name:** ${name || "N/A"}\n**Email:** ${email || "N/A"}\n**Discord:** ${discordDisplay}`,
          inline: false
        },
        {
          name: "📱 TikTok Presence",
          value: `**Handle:** [${tiktok || "@unknown"}](https://tiktok.com/${tiktok?.replace("@", "")})\n**Followers:** ${followers || "N/A"}`,
          inline: true
        }
      ],
      footer: {
        text: "Peace Time Agency • Talent Intake System",
        icon_url: "https://pta-agency.vercel.app/logo.png" // Replace with actual logo URL if available
      },
      timestamp: new Date().toISOString()
    };

    // Add TikTok Profile details if available from OAuth
    if (tiktokProfile) {
      embed.fields.push({
        name: "✅ TikTok Verified Data",
        value: `**Display Name:** ${tiktokProfile.display_name}\n**Internal ID:** \`${tiktokProfile.open_id}\``,
        inline: true
      });
      if (tiktokProfile.avatar_url) {
        embed.thumbnail = { url: tiktokProfile.avatar_url };
      }
    }

    // Add Goals/Vision section
    embed.fields.push({
      name: "🎯 The Vision (6-Month Goals)",
      value: goals || "No goals provided.",
      inline: false
    });

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [embed]
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord Webhook failed: ${response.statusText}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please reach out to us on Discord." },
      { status: 500 }
    );
  }
}
