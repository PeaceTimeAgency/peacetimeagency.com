"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { creators } from "@/lib/creators";
import { Section } from "@/components/layout/Section";

export default function RecruitersPage() {
    const recruiterCreators = creators.filter(c => c.tier === 'recruiter');

    return (
        <main className="min-h-screen bg-background pt-12 pb-24 border-t border-border mt-[68px]">

            <div className="fixed inset-0 bg-dot-grid opacity-20 pointer-events-none mix-blend-screen" />
            <div className="fixed inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />

            <Section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="mb-16 text-center max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4"
                    >
                        Talent Acquisition
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase"
                    >
                        Pick Your <span className="text-gradient-primary">Recruiter.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Browse our dedicated talent scouts and select the representative that aligns best with your brand and vision out in the field.
                    </motion.p>
                </div>

                {/* Same styling as OurCreators but isolated to only 'recruiter' tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {recruiterCreators.map((creator, i) => (
                        <motion.div
                            key={creator.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/creators/${creator.id}`} className="block group relative h-full">
                                <div className="relative overflow-hidden rounded-3xl glass-card transition-all duration-500 group-hover:scale-[1.02] h-full flex flex-col group-hover:shadow-neon-primary">
                                    {/* Image Container */}
                                    <div className="aspect-[4/5] overflow-hidden relative">
                                        <img
                                            src={creator.image}
                                            alt={creator.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-5 mt-auto bg-gradient-to-t from-black/80 to-transparent text-left">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="h-px w-4 bg-primary" />
                                            <span className="text-[10px] font-bold text-primary tracking-widest uppercase truncate">{creator.category}</span>
                                        </div>
                                        <h4 className="text-xl font-black text-white group-hover:text-primary transition-colors duration-300 truncate">
                                            {creator.name}
                                        </h4>
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
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {recruiterCreators.length === 0 && (
                    <div className="w-full text-center text-white/50 py-24 border border-dashed border-white/10 rounded-2xl glass-card">
                        No recruiters currently available to display.
                    </div>
                )}
            </Section>
        </main>
    );
}
