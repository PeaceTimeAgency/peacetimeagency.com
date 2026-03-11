export interface CreatorStats {
  followers: string;
  avgWatchTime: string;
  peakCCV: string;
  totalLikes: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  description: string;
  image: string;
  category: string;
  stats: CreatorStats;
  tags: string[];
  tier?: 'staff' | 'top' | 'new' | 'recruiter';
  webhookUrl?: string;
  liveUrl?: string;
  socials: {
    tiktok: string;
    instagram?: string;
    twitter?: string;
  };
}

export const creators: Creator[] = [
  {
    id: "baked",
    name: "Baked",
    handle: "@baked.laze",
    description: "Hi, I’m Nick, founder of Peace Time Agency. I work directly with creators to help them grow on TikTok LIVE through stream strategy, setup guidance, and community support. My goal is simple, help creators stay consistent, improve their content, and turn streaming into real opportunity.",
    image: "/creators/baked.jpg",
    category: "Agency Staff",
    stats: {
      followers: "N/A",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Staff", "Gaming"],
    tier: "staff",
    liveUrl: "https://www.tiktok.com/@baked.laze/live",
    socials: {
      tiktok: "https://www.tiktok.com/@baked.laze"
    }
  }
];

