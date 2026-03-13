"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { creators, Creator } from "@/lib/creators";
import { Section } from "@/components/layout/Section";

import { CreatorMediaBox } from "@/components/ui/CreatorMediaBox";

const CreatorCardImage = ({ creator }: { creator: Creator }) => {
  const images = creator.images && creator.images.length > 0 ? creator.images : [creator.image];
  
  return (
    <CreatorMediaBox
      images={images}
      name={creator.name}
      imageClassName="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  );
};

const CreatorGrid = ({ title, desc, list, liveHandles = [], isUserSection = false }: { title: string, desc?: string, list: Creator[], liveHandles?: string[], isUserSection?: boolean }) => {
  const router = useRouter();

  const isCreatorLive = (creator: Creator) => {
    const handle = creator.handle.toLowerCase();
    return liveHandles.includes(handle) || 
           (creator.liveUrl && liveHandles.some(lh => creator.liveUrl?.toLowerCase().includes(lh.toLowerCase())));
  };

  if (list.length === 0) return null;
  return (
    <div className="mb-24 last:mb-0">
      <div className="mb-8 border-b border-foreground/10 pb-4">
        <h3 className="text-3xl font-black text-foreground tracking-tight [text-shadow:0_0_1.5px_rgba(0,0,0,0.8)]">{title}</h3>
        {desc && <p className="text-foreground-muted mt-2 text-sm">{desc}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {list.map((creator, i) => {
          const isLive = isCreatorLive(creator);
          return (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={creator.tier === 'recruiter' ? `/recruiters/${creator.id}` : `/creators/${creator.id}`} className="block group relative h-full">
                <div className={`relative overflow-hidden rounded-3xl glass-card transition-all duration-500 group-hover:scale-[1.02] h-full flex flex-col ${isLive ? 'shadow-[0_0_30px_rgba(255,60,95,0.3)] ring-1 ring-primary' : 'group-hover:shadow-neon-primary'}`}>
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    {isLive && (
                      <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 bg-primary px-2.5 py-1 rounded shadow-lg shadow-black/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-black text-white tracking-widest uppercase">Live</span>
                      </div>
                    )}
                    {isUserSection && (
                      <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 bg-green-500 px-2.5 py-1 rounded shadow-lg shadow-black/50">
                        <span className="text-[10px] font-black text-white tracking-widest uppercase">You</span>
                      </div>
                    )}
                    <CreatorCardImage creator={creator} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 mt-auto bg-gradient-to-t from-black/80 to-transparent text-left">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="h-px w-4 bg-primary" />
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase truncate">
                        {creator.title ? creator.title : creator.category.replace('Agency Staff', 'Staff').replace(/\s+and\s+/gi, ' / ')}
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors duration-300 truncate [text-shadow:0_0_1.5px_rgba(0,0,0,0.8)]">
                      {creator.name}
                    </h4>
                    <p className="text-xs text-foreground/50 font-mono mt-0.5 group-hover:text-foreground/80 transition-colors truncate">
                      {creator.handle}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {creator.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/40 border border-foreground/10 uppercase tracking-tighter truncate max-w-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {creator.tier === 'recruiter' && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/apply?recruiter=${creator.id}`);
                        }}
                        className="mt-4 w-full py-2.5 text-center border border-primary/40 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,60,95,0.1)]"
                      >
                        Interview for {creator.name.split(' ')[0]}
                      </button>
                    )}
                  </div>

                  {/* Hover stats reveal - Hidden when live */}
                  {!isLive && (
                    <div className="absolute top-4 right-4 text-right transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-lg font-black text-primary drop-shadow-md">
                        {creator.stats.followers}
                      </div>
                      <div className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest leading-tight">
                        Followers
                      </div>
                      {creator.stats.totalLikes && creator.stats.totalLikes !== "0" && (
                        <div className="mt-2">
                          <div className="text-sm font-black text-foreground drop-shadow-md">
                            {creator.stats.totalLikes}
                          </div>
                          <div className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest leading-tight">
                            Likes
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

interface LiveCreator {
  username: string;
  avatar?: string;
}

export function OurCreators({ isMainPage = false }: { isMainPage?: boolean }) {
  const [liveCreators, setLiveCreators] = useState<LiveCreator[]>([]);

  useEffect(() => {
    fetch('/api/tiktok/live')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.status === 'success' && data.data?.live_creators) {
          setLiveCreators(data.data.live_creators);
        }
      })
      .catch(console.error);
  }, []);


  const staffCreators = creators.filter(c => c.tier === 'staff');
  const recruiterCreators = creators.filter(c => c.tier === 'recruiter');
  const topCreators = creators.filter(c => c.tier === 'top').slice(0, 5);
  const newCreators = creators.filter(c => c.tier === 'new').slice(0, 5);

  const displayCreators = isMainPage ? [...staffCreators, ...recruiterCreators, ...topCreators, ...newCreators] : creators;

  const liveHandles = liveCreators.map(lc => lc.username.toLowerCase());
  const liveRoster = displayCreators.filter(c => 
    liveHandles.includes(c.handle.toLowerCase()) || 
    (c.liveUrl && liveHandles.some(lh => c.liveUrl?.toLowerCase().includes(lh)))
  );

  // Extract all unique tags
  const allTags = isMainPage
    ? Array.from(new Set(displayCreators.map(c => c.category))).sort()
    : Array.from(new Set(creators.flatMap(c => c.tags))).sort();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter creators based on the selected tag
  const filteredCreators = selectedTag
    ? displayCreators.filter(c => isMainPage ? c.category === selectedTag : c.tags.includes(selectedTag))
    : displayCreators;

  return (
    <Section id="creators" className="relative overflow-hidden bg-background-surface border-y border-border">
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {isMainPage && (
          <div className="absolute top-0 left-4 md:left-8 z-50">
            <Link
              href="/creators"
              className="group flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 rounded-full transition-all duration-300 text-xs sm:text-sm font-bold text-foreground/80 hover:text-foreground backdrop-blur-md"
            >
              <span className="text-primary group-hover:-translate-x-1 transition-transform hidden sm:inline">←</span>
              View All Creators
            </Link>
          </div>
        )}
        <div className="mb-12 text-center max-w-4xl mx-auto px-4 pt-16 md:pt-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4"
          >
            The Network
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6 [text-shadow:0_0_1.5px_rgba(0,0,0,0.8)]"
          >
            Our <span className="text-primary">Creators.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed"
          >
            The Peace Time roster is home to the most dedicated, high-growth creators on TikTok LIVE.
            We provide the infrastructure; they provide the talent.
          </motion.p>
        </div>

        <div className="px-4 md:px-8 lg:px-12">

          {liveRoster.length > 0 && (
            <CreatorGrid
              title="Live Now"
              desc="Roster members currently broadcasting."
              list={liveRoster}
              liveHandles={liveHandles}
            />
          )}

          {/* Tag Filter System */}
          <div className="mb-12 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${selectedTag === null
                  ? "bg-primary text-foreground-inverse border-primary shadow-neon-primary"
                  : "bg-foreground/5 text-foreground/60 border-foreground/10 hover:bg-foreground/10 hover:text-foreground"
                  }`}
              >
                All Creators
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${selectedTag === tag
                    ? "bg-primary text-foreground-inverse border-primary shadow-neon-primary"
                    : "bg-foreground/5 text-foreground/60 border-foreground/10 hover:bg-foreground/10 hover:text-foreground"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={selectedTag || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredCreators.length > 0 ? (
              selectedTag ? (
                <CreatorGrid
                  title={`${selectedTag} Creators`}
                  desc={`Showing creators specialized in ${selectedTag}.`}
                  list={filteredCreators}
                  liveHandles={liveHandles}
                />
              ) : (
                <div className="flex flex-col">
                  <CreatorGrid
                    title="Agency Staff"
                    desc="The leadership driving Peace Time Agency."
                    list={filteredCreators.filter(c => c.tier === 'staff')}
                    liveHandles={liveHandles}
                  />
                  <CreatorGrid
                    title="Recruiters"
                    desc="Talent acquisition."
                    list={filteredCreators.filter(c => c.tier === 'recruiter')}
                    liveHandles={liveHandles}
                  />
                  {!isMainPage ? (
                    <CreatorGrid
                      title="Creators Category"
                      desc="The talent of Peace Time Agency."
                      list={filteredCreators.filter(c => c.tier !== 'staff' && c.tier !== 'recruiter')}
                      liveHandles={liveHandles}
                    />
                  ) : (
                    <>
                      <CreatorGrid
                        title="Top 5 Performing"
                        desc="Our highest performing creators."
                        list={filteredCreators.filter(c => c.tier === 'top').slice(0, 5)}
                        liveHandles={liveHandles}
                      />
                      <CreatorGrid
                        title="5 Newest Accepted"
                        desc="The latest additions to our roster."
                        list={filteredCreators.filter(c => c.tier === 'new').slice(0, 5)}
                        liveHandles={liveHandles}
                      />
                    </>
                  )}
                </div>
              )
            ) : (
              <div className="text-center py-24 glass-card rounded-3xl border border-dashed border-foreground/10">
                <p className="text-foreground/40 font-medium">No creators are currently listed in this category. Check back soon!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
