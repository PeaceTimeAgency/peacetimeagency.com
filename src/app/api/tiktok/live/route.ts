import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting store for example purposes.
// NOTE: For serverless Next.js edge environments (like Vercel), this map might reset 
// on cold starts or between different edge locations.
// For production, use a persistent external store like Upstash RateLimit (Redis).
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT = 5; // Allow 5 requests
const WINDOW_MS = 60 * 1000; // 1 minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowData = rateLimitMap.get(ip);

  if (!windowData) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true; // Not rate limited
  }

  // If the 1-minute window has passed, reset the count
  if (now - windowData.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  // Check if count exceeds our set limit
  if (windowData.count >= RATE_LIMIT) {
    return false; // Rate limited
  }

  // Increment counter within current window
  windowData.count += 1;
  return true;
}

export async function GET(req: NextRequest) {
  // Extract client IP address for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown_ip";

  // Check rate limit
  const isAllowed = checkRateLimit(ip);

  if (!isAllowed) {
    return NextResponse.json(
      { error: "Too Many Requests. Rate limit exceeded, please try again later." },
      { 
        status: 429,
        headers: {
          "Retry-After": "60", // seconds expected to wait
        }
      }
    );
  }

  try {
    // 1. Example: Protecting via Agency's internal secret key, or expecting the client
    // to authenticate requests to this backend.
    // const authHeader = req.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.AGENCY_SECRET_KEY}`) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // 2. Fetch data from TikTok API
    // In production, this would securely consume your TikTok Developer API key
    // over Server-to-Server connection, shielding the API keys from the frontend client.
    // const response = await fetch("https://open-api.tiktok.com/live/...", {
    //   headers: { Authorization: `Bearer ${process.env.TIKTOK_API_KEY}` }
    // });
    // const data = await response.json();
    
    // Simulate real delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock response for example purposes
    const mockLiveData = {
      status: "success",
      timestamp: new Date().toISOString(),
      source: "pta_proxy",
      data: {
        live_creators: [
          {
            id: "usr_001",
            username: "@elite_creator",
            displayName: "Elite Gamer",
            viewerCount: 14500,
            room_id: "room_8139581903",
            category: "Gaming",
            stream_title: "Grinding rank 1 all night 🎮",
          },
          {
            id: "usr_002",
            username: "@tech_guru",
            displayName: "Tech Guru",
            viewerCount: 3200,
            room_id: "room_8139581904",
            category: "Technology",
            stream_title: "Building a mechanical keyboard live",
          },
        ],
        total_live: 2,
      },
    };

    const res = NextResponse.json(mockLiveData, { status: 200 });
    
    // Disable caching to show real live state consistently (optional based on your design)
    res.headers.set("Cache-Control", "no-store, max-age=0");
    
    return res;

  } catch (error) {
    console.error("TikTok API Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
