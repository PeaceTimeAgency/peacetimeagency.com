"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { creators, Creator } from "@/lib/creators";
import { Section } from "@/components/layout/Section";

const CreatorGrid = ({ title, desc, list }: { title: string, desc?: string, list: Creator[] }) => {
  if (list.length === 0) return null;
  return (
    <div className="mb-24">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
        {desc && <p className="text-foreground-muted mt-2 text-sm">{desc}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {list.map((creator, i) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/creators/${creator.id}`} className="block group relative h-full">
              <div className="relative overflow-hidden rounded-3xl glass-card transition-all duration-500 group-hover:shadow-neon-primary group-hover:scale-[1.02] h-full flex flex-col">
                {/* Image Container */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={creator.image} 
                    alt={creator.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-sm group-hover:blur-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 mt-auto bg-gradient-to-t from-black/80 to-transparent text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="h-px w-4 bg-primary" />
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase truncate">{creator.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors duration-300 truncate">
                    {creator.name}
                  </h3>
                  <p className="text-xs text-white/50 font-mono mt-0.5 group-hover:text-white/80 transition-colors truncate">
                    {creator.handle}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {creator.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/10 uppercase tracking-tighter truncate max-w-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover stats reveal */}
                <div className="absolute top-4 right-4 text-right transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-lg font-black text-primary drop-shadow-md">
                    {creator.stats.followers}
                  </div>
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                    Followers
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function CreatorsPage() {
  const staff = creators.filter(c => c.tier === 'staff');
  const top = creators.filter(c => c.tier === 'top');
  const newest = creators.filter(c => c.tier === 'new');
  return (
    <main className="min-h-screen bg-background pt-12 pb-20">
      <Section className="pb-4">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4"
          >
            The Network
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
          >
            Elite <span className="text-gradient-primary">Creators.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground-muted text-lg max-w-2xl leading-relaxed"
          >
            The Peace Time roster is home to the most dedicated, high-growth creators on TikTok LIVE. 
            We provide the infrastructure; they provide the talent.
          </motion.p>
        </div>
      </Section>

      <Section container={false} className="px-4 md:px-8 lg:px-12">
        <CreatorGrid 
          title="PTA Staff" 
          desc="The leadership and technical architects powering the infrastructure." 
          list={staff} 
        />
        <CreatorGrid 
          title="Top 5 Performing" 
          desc="Our highest-grossing and most engaged creators right now." 
          list={top} 
        />
        <CreatorGrid 
          title="5 Newest Accepted" 
          desc="The latest elite talent globally to join the Peace Time network." 
          list={newest} 
        />
      </Section>
    </main>
  );
}
