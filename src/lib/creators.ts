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
  tier?: 'staff' | 'top' | 'new';
  socials: {
    tiktok: string;
    instagram?: string;
    twitter?: string;
  };
}

export const creators: Creator[] = [
  // PTA STAFF
  {
    id: "staff-founder",
    name: "Eleanor Vance",
    handle: "@ptafounder",
    description: "Founder & Talent Director. Ensuring creators get maximum ROI on their streams.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Agency",
    tier: "staff",
    stats: { followers: "15k", avgWatchTime: "15m", peakCCV: "500", totalLikes: "100k" },
    tags: ["Leadership", "Strategy"],
    socials: { tiktok: "https://tiktok.com/@ptafounder" }
  },
  {
    id: "staff-manager",
    name: "Marcus Cole",
    handle: "@ptamarcus",
    description: "Lead Technical Producer. Handling stream architectures and OBS routing.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Agency",
    tier: "staff",
    stats: { followers: "12k", avgWatchTime: "25m", peakCCV: "800", totalLikes: "85k" },
    tags: ["Technical", "OBS Expert"],
    socials: { tiktok: "https://tiktok.com/@ptamarcus" }
  },

  // TOP 5 PERFORMING
  {
    id: "top-alex-rivers",
    name: "Alex Rivers",
    handle: "@alexrivers",
    description: "High-energy gaming content and late-night talk shows. Known for interactive challenges.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Gaming",
    tier: "top",
    stats: { followers: "1.2M", avgWatchTime: "42m", peakCCV: "45k", totalLikes: "25M" },
    tags: ["Competitive", "Interaction"],
    socials: { tiktok: "https://tiktok.com/@alexrivers" }
  },
  {
    id: "top-sarah-smiles",
    name: "Sarah Smiles",
    handle: "@sarahsmiles",
    description: "Empathetic storytelling and daily lifestyle vlogs. Deep audience connection.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop",
    category: "Lifestyle",
    tier: "top",
    stats: { followers: "850k", avgWatchTime: "35m", peakCCV: "12k", totalLikes: "18M" },
    tags: ["Storytelling", "ASMR"],
    socials: { tiktok: "https://tiktok.com/@sarahsmiles" }
  },
  {
    id: "top-music-vibe",
    name: "Music Vibe",
    handle: "@musicvibe",
    description: "Live looping and multi-instrumental performances. Taking song requests.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Music",
    tier: "top",
    stats: { followers: "2.1M", avgWatchTime: "30m", peakCCV: "25k", totalLikes: "40M" },
    tags: ["Live Looping", "Performance"],
    socials: { tiktok: "https://tiktok.com/@musicvibe" }
  },
  {
    id: "top-tech-guru",
    name: "Tech Guru",
    handle: "@techguru",
    description: "Breaking down complex engineering and software concepts through live builds.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=550&auto=format&fit=crop",
    category: "Tech",
    tier: "top",
    stats: { followers: "450k", avgWatchTime: "55m", peakCCV: "8k", totalLikes: "5M" },
    tags: ["Engineering", "Coding"],
    socials: { tiktok: "https://tiktok.com/@techguru" }
  },
  {
    id: "top-chef-master",
    name: "Chef Master",
    handle: "@thechefmaster",
    description: "Professional cooking streams. Teaching culinary excellence live.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Food",
    tier: "top",
    stats: { followers: "600k", avgWatchTime: "40m", peakCCV: "15k", totalLikes: "12M" },
    tags: ["Culinary", "Live Cooking"],
    socials: { tiktok: "https://tiktok.com/@thechefmaster" }
  },

  // 5 NEWEST ACCEPTED
  {
    id: "new-fitness-pro",
    name: "Fitness Pro",
    handle: "@fitpro_daily",
    description: "Daily workout streams and live personal training tips.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Fitness",
    tier: "new",
    stats: { followers: "150k", avgWatchTime: "20m", peakCCV: "2k", totalLikes: "1.5M" },
    tags: ["Workout", "Health"],
    socials: { tiktok: "https://tiktok.com/@fitpro_daily" }
  },
  {
    id: "new-art-studio",
    name: "Art Studio",
    handle: "@liveartstudio",
    description: "Painting and digital art creation in real-time.",
    image: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Art",
    tier: "new",
    stats: { followers: "90k", avgWatchTime: "45m", peakCCV: "3k", totalLikes: "2M" },
    tags: ["Painting", "Digital Art"],
    socials: { tiktok: "https://tiktok.com/@liveartstudio" }
  },
  {
    id: "new-dance-crew",
    name: "Street Dance Crew",
    handle: "@streetdancecrew",
    description: "Choreography routines broadcasted live from the studio.",
    image: "https://images.unsplash.com/photo-1508807526345-15e8b5691d2d?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Dance",
    tier: "new",
    stats: { followers: "210k", avgWatchTime: "15m", peakCCV: "5k", totalLikes: "4M" },
    tags: ["Choreography", "Dance"],
    socials: { tiktok: "https://tiktok.com/@streetdancecrew" }
  },
  {
    id: "new-book-club",
    name: "Midnight Book Club",
    handle: "@midnightbooks",
    description: "Live reading sessions and literature analysis.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Education",
    tier: "new",
    stats: { followers: "60k", avgWatchTime: "60m", peakCCV: "1k", totalLikes: "500k" },
    tags: ["Reading", "Analysis"],
    socials: { tiktok: "https://tiktok.com/@midnightbooks" }
  },
  {
    id: "new-pet-rescue",
    name: "Paws Rescue",
    handle: "@pawsrescue_live",
    description: "Live animal rescue streams and shelter daily life.",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Animals",
    tier: "new",
    stats: { followers: "300k", avgWatchTime: "25m", peakCCV: "8k", totalLikes: "8M" },
    tags: ["Rescue", "Pets"],
    socials: { tiktok: "https://tiktok.com/@pawsrescue_live" }
  }
];
