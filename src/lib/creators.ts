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
  title?: string;
  description: string;
  image: string;
  category: string;
  stats: CreatorStats;
  tags: string[];
  tier?: 'staff' | 'top' | 'new' | 'recruiter';
  webhookUrl?: string;
  liveUrl?: string;
  images?: string[];
  socials: {
    tiktok: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    discord?: string;
    twitch?: string;
    steam?: string;
    website?: string;
  };
}

export const creators: Creator[] = [
  {
    id: "baked",
    name: "Baked",
    handle: "@baked.laze",
    title: "Founder",
    description: "Hi, I’m Nick, founder of Peace Time Agency. I work directly with creators to help them grow on TikTok LIVE through stream strategy, setup guidance, and community support. My goal is simple, help creators stay consistent, improve their content, and turn streaming into real opportunity.",
    image: "/creators/baked.jpg",
    category: "Staff / Gaming",
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
  },

  {
    id: "oopsitsjrpgtime",
    name: "OopsItsJRPGTime",
    handle: "@oopsitsjrpgtime",
    description: "Hello there my name is OopsItsJRPGTime or \"Oops\" for short! If I were to have to describe myself as a vibe it would have to be \"Chill.\" I stream mostly JRPG Games from classic to new and anywhere in between! I first fell in love with Jrpg games back on the SNES with my very first game ever Breath of Fire and from then on I was hooked! My goal for streaming has always been to make amazing friends, so will you be my friend?!",
    image: "/creators/oopsitsjrpgtime.jpg",
    category: "Gaming",
    stats: {
      followers: "New",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Gaming", "JRPGs", "Classic"],
    tier: "new",
    liveUrl: "https://www.tiktok.com/@oopsitsjrpgtime/live",
    socials: {
      tiktok: "https://www.tiktok.com/@oopsitsjrpgtime",
      twitch: "https://www.twitch.tv/oopsitsjrpgtime",
      youtube: "https://www.youtube.com/@OopsItsJRPGTIME",
      discord: "https://discordapp.com/users/oopsitsjrpgtime",
      steam: "https://steamcommunity.com/id/OopsItsJRPGTIME",
      website: "https://www.oopsitsjrpgtime.com/"
    }
  },
  {
    id: "mrleftythehand",
    name: "Mr. Lefty the Hand",
    handle: "@mrleftythehand",
    description: "I’m Mr. Lefty, a hand that somehow ended up flying planes, driving tanks, and making questionable tactical decisions in War Thunder. Whether it’s clutch moments, terrible aim, or Gaijin doing Gaijin things, Lefty’s here for random bits of chaos along the way.",
    image: "/creators/mrleftythehand.jpg",
    category: "Gaming",
    stats: {
      followers: "New",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Gaming", "War Thunder", "Tanks", "Planes"],
    tier: "new",
    liveUrl: "https://www.tiktok.com/@mrleftythehand/live",
    images: [
      "/creators/mrleftythehand.jpg",
      "/creators/mrleftythehand_tank.png",
      "/creators/mrleftythehand_plane.png"
    ],
    socials: {
      tiktok: "https://www.tiktok.com/@mrleftythehand",
      twitch: "https://www.twitch.tv/mrleftythehand"
    }
  }
];

