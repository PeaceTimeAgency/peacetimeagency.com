"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const steps = [
  {
    id: "welcome",
    title: "Start Your Journey",
    subtitle: "Tell us who you are. We'll handle the rest.",
    fields: [
      { name: "name", label: "Legal Name", type: "text", placeholder: "John Doe" },
      { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
    ]
  },
  {
    id: "socials",
    title: "Your Presence",
    subtitle: "Where can we find your content?",
    fields: [
      { name: "tiktok", label: "TikTok Handle", type: "text", placeholder: "@username" },
      { name: "followers", label: "Current Follower Count", type: "text", placeholder: "e.g. 50k" },
    ]
  },
  {
    id: "goals",
    title: "The Vision",
    subtitle: "What are your 6-month goals?",
    fields: [
      { name: "goals", label: "Primary Goal", type: "textarea", placeholder: "Scale my revenue, reach Top 100, improve production..." },
      { name: "discord", label: "Discord User ID (Optional)", type: "text", placeholder: "username#0000 or username" },
    ]
  }
];

function ApplicationForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(searchParams.get("connected") === "true");
  const [tiktokProfile, setTiktokProfile] = useState<any>(null);

  useEffect(() => {
    // Check if we just returned from a successful TikTok connection
    if (searchParams.get("connected") === "true") {
      fetchTikTokProfile();
    }
  }, [searchParams]);

  const fetchTikTokProfile = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch("/api/tiktok/profile");
      if (response.ok) {
        const data = await response.json();
        setTiktokProfile(data);
        // Auto-populate form data
        setFormData(prev => ({
          ...prev,
          tiktok: `@${data.username}`,
          followers: data.follower_count ? `${(data.follower_count / 1000).toFixed(1)}k` : prev.followers,
          name: data.display_name || prev.name,
        }));
        // Switch to the socials step if we're not there already
        setCurrentStep(1);
      }
    } catch (error) {
      console.error("Failed to fetch TikTok profile", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectTikTok = () => {
    window.location.href = "/api/auth/tiktok";
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/apply/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            tiktokProfile: tiktokProfile // Include the full profile data if available
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          const error = await response.json();
          alert(error.error || "Failed to submit application. Please try again.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("An unexpected error occurred. Please check your connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-lg w-full p-12 text-center rounded-[40px] border-primary/20"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Application Received</h1>
          <p className="text-foreground-muted mb-12">
            Our team will review your profile and reach out within 48 hours. 
            In the meantime, join our elite community.
          </p>
          <a 
            href="https://discord.gg/peacetime" 
            target="_blank"
            className="block w-full py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg shadow-[#5865F2]/20"
          >
            Join the Discord
          </a>
          <Link href="/" className="inline-block mt-8 text-xs font-bold text-foreground-subtle hover:text-white transition-colors uppercase tracking-widest">
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  const step = steps[currentStep];

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 overflow-hidden relative">
      <Section>
        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-white/5 rounded-full mb-12 overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-black text-primary tracking-[0.3em] uppercase mb-4">
                Step {currentStep + 1} of {steps.length}
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter">
                {step.title}
              </h1>
              <p className="text-foreground-muted mb-10">{step.subtitle}</p>

              {step.id === "socials" && (
                <div className="mb-8">
                  {tiktokProfile ? (
                    <div className="glass-card p-6 flex items-center justify-between border-primary/30 bg-primary/5">
                      <div className="flex items-center gap-4">
                        {tiktokProfile.avatar_url && (
                          <img 
                            src={tiktokProfile.avatar_url} 
                            alt={tiktokProfile.username} 
                            className="w-12 h-12 rounded-full border border-white/10"
                          />
                        )}
                        <div>
                          <p className="text-xs font-bold text-primary uppercase tracking-widest">Connected</p>
                          <p className="text-lg font-black text-white">{tiktokProfile.display_name || tiktokProfile.username}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-foreground-subtle uppercase">Followers</p>
                        <p className="text-sm font-black text-white">
                          {tiktokProfile.follower_count ? `${(tiktokProfile.follower_count / 1000).toFixed(1)}k` : 'Private'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleConnectTikTok}
                      disabled={isConnecting}
                      className="w-full flex items-center justify-center gap-3 py-4 glass-card border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all group"
                    >
                      <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                      </svg>
                      <span className="font-black text-white uppercase tracking-widest text-sm">
                        {isConnecting ? "Connecting..." : "Connect with TikTok"}
                      </span>
                    </button>
                  )}
                </div>
              )}

              <div className="space-y-6">
                {step.fields.map(field => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest ml-1">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea 
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all min-h-[120px]"
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    ) : (
                      <input 
                        type={field.type}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 flex gap-4">
                {currentStep > 0 && (
                  <button 
                    onClick={handleBack}
                    className="flex-1 py-4 glass-card border-white/10 hover:border-white/20 text-white font-bold rounded-2xl transition-all uppercase tracking-widest text-sm"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : (currentStep === steps.length - 1 ? "Submit Application" : "Continue")}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>
    </main>
  );
}

export default function ApplicationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <ApplicationForm />
    </Suspense>
  );
}
