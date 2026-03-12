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
  },
  {
    id: "trashsoupgaming",
    name: "Trash (aka Lindsey)",
    handle: "@trashsoupgaming",
    description: "Lindsey, also known as Trash (@TrashSoupGaming), is a full-time TikTok streamer who focuses on story-driven games like RPGs and well-written horror. Over time, she has built a strong, loyal community that doesn’t just show up for the games, but for the conversations, reactions, and shared experiences that happen during every stream. Lindsey believes that growth on TikTok LIVE isn’t just about numbers. It’s about building a space where people want to come back, where viewers feel part of something, and where creators can develop confidence in what they’re doing. For Lindsey, streaming isn’t just about going live. It’s about helping others find their place and grow along the way.",
    image: "/branding/KYRAX425.png",
    category: "Staff / Gaming / Just Chatting",
    stats: {
      followers: "Full-time",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Staff", "Gaming", "RPG", "Horror", "Just Chatting"],
    tier: "staff",
    liveUrl: "https://www.tiktok.com/@trashsoupgaming/live",
    socials: {
      tiktok: "https://www.tiktok.com/@trashsoupgaming",
      youtube: "https://www.youtube.com/@trashsoupgaming",
      website: "https://trashsoup.live/"
    }
  },
  {
    id: "papaj",
    name: "Papa J",
    handle: "@papa.j547",
    description: "Just a gamer from Wyoming. I've been gaming since the Atari 2600 lol. Mostly I stream War Thunder but will occasionally change it up with something different.",
    image: "/branding/KYRAX425.png",
    category: "Gaming / Just Chatting / IRL",
    stats: {
      followers: "New",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Gaming", "Just Chatting", "IRL", "War Thunder", "Wyoming"],
    tier: "new",
    liveUrl: "https://www.tiktok.com/@papa.j547/live",
    socials: {
      tiktok: "https://www.tiktok.com/@papa.j547",
      twitch: "https://www.twitch.tv/Gaming_With_Papa_J",
      discord: "https://discordapp.com/users/pwnll307"
    }
  },
  {
    id: "itsjakee_78",
    name: "ItsJakee_78",
    handle: "@itsjakee_78",
    description: "I’m a gaming creator posting Warzone gameplay, gaming memes, and fun squad moments.",
    image: "/branding/KYRAX425.png",
    category: "Gaming",
    stats: {
      followers: "New",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Gaming", "Warzone", "Memes", "Squad"],
    tier: "new",
    liveUrl: "https://www.tiktok.com/@itsjakee_78/live",
    socials: {
      tiktok: "https://www.tiktok.com/@itsjakee_78",
      twitch: "https://m.twitch.tv/itsjakee_78",
      youtube: "https://m.youtube.com/@ItsJakee_78",
      instagram: "https://www.instagram.com/itsjakee_78?igsh=MWl5anRybnh6aXZlaQ%3D%3D&utm_source=qr",
      website: "https://kick.com/itsjakee-78"
    }
  }
];

