'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Creator } from '@/types';

const mockCreators: Creator[] = [
  { id: 1, name: 'AlexRivers', viewers: '12.4k', category: 'Gaming', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'SarahSmiles', viewers: '8.2k', category: 'Chatting', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'TechGuru_99', viewers: '5.1k', category: 'Tech', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'MusicVibes', viewers: '18.9k', category: 'Music', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'ChefMaster', viewers: '3.4k', category: 'Food', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'FitnessPro', viewers: '6.7k', category: 'Fitness', avatar: 'https://i.pravatar.cc/150?u=6' },
];

const categoryColors: Record<string, string> = {
  Gaming: 'bg-secondary/15 text-secondary',
  Chatting: 'bg-primary/15 text-primary',
  Tech: 'bg-blue-500/15 text-blue-400',
  Music: 'bg-pink-500/15 text-pink-400',
  Food: 'bg-amber-500/15 text-amber-400',
  Fitness: 'bg-emerald-500/15 text-emerald-400',
};

export default function WhosLiveNow() {
  return (
    <div id="creators" className="w-full overflow-hidden py-20 relative bg-background-surface">
      {/* Top/bottom edge fades */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Header */}
      <div className="container mx-auto px-4 mb-10 flex justify-between items-end relative z-10">
        <div>
          <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-2">PTA Roster</p>
          <h2 className="text-3xl font-black tracking-tight text-foreground">Live Right Now</h2>
          <p className="text-foreground-muted mt-1.5 text-sm">Elite creators currently broadcasting.</p>
        </div>
        <button className="hidden sm:flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors group font-medium">
          View All
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Side fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-surface to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="flex w-fit animate-scroll hover:[animation-play-state:paused] gap-4 px-4">
        {[...mockCreators, ...mockCreators].map((creator, i) => {
          const tagClass = categoryColors[creator.category] || 'bg-white/10 text-foreground-muted';
          return (
            <div
              key={`${creator.id}-${i}`}
              className="relative shrink-0 w-60 group cursor-pointer"
            >
              {/* Hover glow border */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/40 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
              
              <div className="relative glass-card rounded-2xl p-4 transition-transform duration-300 group-hover:-translate-y-1.5">
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

                {/* Avatar + info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full ring-2 ring-primary/50 overflow-hidden animate-live-ring">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-foreground-inverse text-[9px] font-black px-1 py-px rounded-full leading-none uppercase">
                      Live
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground text-sm truncate">{creator.name}</h4>
                    <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md inline-block mt-0.5 ${tagClass}`}>
                      {creator.category}
                    </span>
                  </div>
                </div>

                {/* Viewer count */}
                <div className="flex items-center justify-between rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                    />
                    {creator.viewers} watching
                  </div>
                  <span className="text-[10px] text-foreground-subtle font-medium">PTA</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
