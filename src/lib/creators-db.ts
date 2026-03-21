import { redis } from './redis';
import { Creator, creators as defaultCreators } from './creators';
import { Article, defaultArticles } from './news';
import fs from 'fs';
import path from 'path';

const REDIS_KEY = 'pta:creators_list';
const SITE_SETTINGS_KEY = 'pta:site_settings';
const NEWS_KEY = 'pta:news_list';
const MOCK_DB_PATH = path.join(process.cwd(), 'mock-db.json');

// Helper to handle local file-based mock DB for dev testing
function getMockDb() {
  if (fs.existsSync(MOCK_DB_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(MOCK_DB_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading mock DB:', e);
    }
  }
  return {};
}

function saveMockDb(data: any) {
  const current = getMockDb();
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify({ ...current, ...data }, null, 2));
}

export async function getCreatorsFromDb(): Promise<Creator[]> {
  try {
    const data = await redis.get<Creator[]>(REDIS_KEY);
    if (data && Array.isArray(data)) {
      return data;
    }
    
    // Fallback to file-based mock DB (Mock Mode persistence)
    const mockDb = getMockDb();
    if (mockDb.creators && Array.isArray(mockDb.creators)) {
      console.log('Using file-based mock creators:', mockDb.creators.length);
      return mockDb.creators;
    }
    
    // Fallback to default list if not initialized in Redis or Mock DB
    return defaultCreators;
  } catch (error) {
    console.error('Error fetching creators from Redis:', error);
    const mockDb = getMockDb();
    return mockDb.creators || defaultCreators;
  }
}

export async function saveCreatorsToDb(creators: Creator[]): Promise<boolean> {
  // Update file-based mock for immediate feedback in dev
  console.log('Saving to file-based mock creators:', creators.length);
  saveMockDb({ creators });
  
  try {
    await redis.set(REDIS_KEY, creators);
    return true;
  } catch (error) {
    console.error('Error saving creators to Redis:', error);
    return false;
  }
}

export async function getNewsFromDb(): Promise<Article[]> {
  try {
    const data = await redis.get<Article[]>(NEWS_KEY);
    if (data && Array.isArray(data)) {
      return data;
    }
    
    // Fallback to file-based mock DB
    const mockDb = getMockDb();
    if (mockDb.news && Array.isArray(mockDb.news)) {
      console.log('Using file-based mock news:', mockDb.news.length);
      return mockDb.news;
    }
    
    return defaultArticles;
  } catch (error) {
    console.error('Error fetching news from Redis:', error);
    const mockDb = getMockDb();
    return mockDb.news || defaultArticles;
  }
}

export async function saveNewsToDb(news: Article[]): Promise<boolean> {
  // Update file-based mock
  console.log('Saving to file-based mock news:', news.length);
  saveMockDb({ news });
  
  try {
    await redis.set(NEWS_KEY, news);
    return true;
  } catch (error) {
    console.error('Error saving news to Redis:', error);
    return false;
  }
}

// Optional utility to seed/reset Redis
export async function resetCreatorsToDefault(): Promise<boolean> {
  return await saveCreatorsToDb(defaultCreators);
}

export interface SiteSettings {
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    stats: { value: string; label: string }[];
  };
  services: {
    index: string;
    title: string;
    description: string;
    accent: string;
    bar: string;
    tag: string;
  }[];
  growthPhases: {
    title: string;
    titleGradient: string;
    description: string;
    tag: string;
    phases: {
      number: string;
      name: string;
      focus: string;
      role: string;
      accent: string;
      border: string;
      bg: string;
      glow: string;
      connector: string;
    }[];
    bottomCallout: string;
  };
  testimonials: {
    tag: string;
    title: string;
    titleGradient: string;
    items: {
      videoSrc: string;
      quote: string;
      creatorName: string;
    }[];
  };
  rosterSettings: {
    mainTag: string;
    mainTitle: string;
    mainTitleAccent: string;
    mainDescription: string;
    sections: {
      liveNow: { title: string; desc: string };
      agencyStaff: { title: string; desc: string };
      topPerforming: { title: string; desc: string };
      newests: { title: string; desc: string };
      allCreators: { title: string; desc: string };
    };
  };
  liveSection: {
    tag: string;
    title: string;
  };
  faqs: {
    q: string;
    a: string;
  }[];
  footer: {
    tagline: string;
    socials: {
      platform: 'tiktok' | 'discord' | 'instagram' | 'youtube' | 'twitch' | 'website';
      url: string;
      show: boolean;
    }[];
  };
}

export const defaultSiteSettings: SiteSettings = {
  hero: {
    headlineLine1: "The Creator Agency",
    headlineLine2: "Built for Streamers.",
    subheadline: "We provide the infrastructure, strategy, and community to help you grow on your own terms. No quotas. No pressure. No predatory contracts.",
    stats: [
      { value: '24/7', label: 'Creator Support System' },
      { value: 'Top Tier', label: 'TikTok LIVE Creator Network' },
      { value: 'Millions', label: 'LIVE Viewers Reached' },
      { value: '147', label: 'Active Members' },
    ]
  },
  services: [
    {
      index: "01",
      title: "Technical & Aesthetic",
      description: "Full-spectrum broadcast optimization. We refine your lighting architecture, camera positioning, and audio processing to maximize viewer retention from the first second.",
      accent: "text-primary",
      bar: "bg-primary",
      tag: "Department",
    },
    {
      index: "02",
      title: "Data-Driven Strategy",
      description: "Algorithmic positioning based on real-time analytics. We optimize your stream hooks and retention loops to capture and hold platform-wide momentum.",
      accent: "text-secondary",
      bar: "bg-secondary",
      tag: "Department",
    },
    {
      index: "03",
      title: "Admin & Account Safety",
      description: "Direct handling of platform policy and account security. We manage ban appeals, flag resolution, and compliance so you can focus exclusively on creation.",
      accent: "text-primary",
      bar: "bg-primary",
      tag: "Department",
    },
    {
      index: "04",
      title: "The Exit Guarantee",
      description: "Total creator autonomy. You retain 100% control over your account. If you choose to leave, we facilitate a clean transition with no hidden restrictions.",
      accent: "text-secondary",
      bar: "bg-secondary",
      tag: "Creator-First",
    },
    {
      index: "05",
      title: "Zero-Pressure Policy",
      description: "No mandatory hours or performance benchmarks. We provide the infrastructure; you decide the pace. Our support remains constant regardless of your streaming volume.",
      accent: "text-primary",
      bar: "bg-primary",
      tag: "Creator-First",
    },
    {
      index: "06",
      title: "Education Center",
      description: "Exclusive access to our private resource library. Over 50+ modules covering advanced TikTok LIVE strategy, technical setup, and community management.",
      accent: "text-secondary",
      bar: "bg-secondary",
      tag: "Onboarding",
    },
  ],
  growthPhases: {
    tag: "Creator Journey",
    title: "Three phases.",
    titleGradient: "One clear path forward.",
    description: "Every creator moves through the same journey. We know exactly how to guide each phase.",
    phases: [
      {
        number: "01",
        name: "Foundation",
        focus: "Tech & Environment",
        role: "The baseline for professional broadcasting. We audit your technical environment to ensure your setup meets the high-fidelity standards required for elite platform push.",
        accent: "text-primary",
        border: "border-primary/30",
        bg: "bg-primary/10",
        glow: "shadow-[0_0_40px_rgba(108,92,231,0.15)]",
        connector: "from-primary/40",
      },
      {
        number: "02",
        name: "Engagement",
        focus: "Algorithmic Reach",
        role: "Transitioning from technical stability to psychological reach. We focus on viewer retention patterns and interaction loops that trigger the platform's distribution algorithm.",
        accent: "text-secondary",
        border: "border-secondary/30",
        bg: "bg-secondary/10",
        glow: "shadow-[0_0_40px_rgba(253,121,168,0.15)]",
        connector: "from-secondary/40",
      },
      {
        number: "03",
        name: "Expansion",
        focus: "Community & Revenue",
        role: "Scaling your influence into a sustainable ecosystem. This phase refines your relationship with your core audience to drive consistent growth and long-term monetization.",
        accent: "text-accent",
        border: "border-accent/30",
        bg: "bg-accent/10",
        glow: "shadow-[0_0_40px_rgba(0,206,201,0.15)]",
        connector: "from-accent/40",
      },
    ],
    bottomCallout: "Growth at your pace. Transparent by design. Built for creators.",
  },
  testimonials: {
    tag: "Proof of Work",
    title: "Hear from our",
    titleGradient: "Creators.",
    items: [],
  },
  rosterSettings: {
    mainTag: "The Network",
    mainTitle: "Our",
    mainTitleAccent: "Creators.",
    mainDescription: "The Peace Time roster is home to the most dedicated, high-growth creators on TikTok LIVE. We provide the infrastructure; they provide the talent.",
    sections: {
      liveNow: { title: "Live Now", desc: "Roster members currently broadcasting." },
      agencyStaff: { title: "Agency Staff", desc: "The leadership driving Peace Time Agency." },
      topPerforming: { title: "Top 5 Performing", desc: "Our highest performing creators." },
      newests: { title: "Peace Time's Newests", desc: "The latest additions to our roster." },
      allCreators: { title: "Peace Time Creators", desc: "The talent of Peace Time Agency." },
    }
  },
  liveSection: {
    tag: "Live Now",
    title: "Elite Creators Broadcasting",
  },
  faqs: [
    {
      q: "What are the expectations and quotas?",
      a: "None. Peace Time operates on a Zero-Pressure Policy: no minimum hours, no gifting benchmarks, and no quotas. We provide the tools; you determine the velocity.",
    },
    {
      q: "How do I join the agency?",
      a: "Submission is handled via TikTok's official agency portal. There are no external legal traps or side-contracts. Once we invite you, everything is finalized securely within the app.",
    },
    {
      q: "Are there any restrictive contracts?",
      a: "Never. We operate exclusively within the official TikTok Agency framework. Transparency is core to our model: no hidden clauses, and no fine print beyond TikTok's standard platform terms.",
    },
    {
      q: "What happens if I decide to leave?",
      a: "You retain full account ownership. You can leave at any time, subject only to TikTok's own platform-mandated 60-day transition window which applies to all agency moves.",
    },
    {
      q: "What does the agency actually do for my stream?",
      a: "We provide professional technical audits, data-driven strategy sessions, and 24/7 administrative support for account safety and platform compliance.",
    },
    {
      q: "What do I get immediately upon joining?",
      a: "Instant access to our 50+ module Education Center, a full technical setup audit, and entry into our private Discord network for strategy and collaboration.",
    },
  ],
  footer: {
    tagline: "The elite hub for TikTok LIVE creators.",
    socials: [
      { platform: 'tiktok', url: '#', show: true },
      { platform: 'discord', url: '#', show: true },
    ]
  }
};


export async function getSiteSettingsFromDb(): Promise<SiteSettings> {
  try {
    const data = await redis.get<SiteSettings>(SITE_SETTINGS_KEY);
    if (data && data.hero && data.services && data.faqs && data.footer) {
      return data;
    }
    
    // Fallback to file-based mock DB (Mock Mode persistence)
    const mockDb = getMockDb();
    if (mockDb.settings && mockDb.settings.hero) {
      console.log('Using file-based mock site settings');
      return mockDb.settings;
    }

    return defaultSiteSettings;
  } catch (error) {
    console.error('Error fetching site settings from Redis:', error);
    const mockDb = getMockDb();
    return mockDb.settings || defaultSiteSettings;
  }
}

export async function saveSiteSettingsToDb(settings: SiteSettings): Promise<boolean> {
  // Update file-based mock for immediate feedback in dev
  console.log('Saving to file-based mock site settings');
  saveMockDb({ settings });

  try {
    await redis.set(SITE_SETTINGS_KEY, settings);
    return true;
  } catch (error) {
    console.error('Error saving site settings to Redis:', error);
    return false;
  }
}
