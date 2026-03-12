"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { creators } from "@/lib/creators";

const CONTENT_TYPES = [
  "Just Chatting / Casual Talk",
  "Gaming / Gameplay",
  "IRL (In Real Life) / Daily Life",
  "Talent Shows / Singing, Dancing, Performances",
  "Battles / PK / LIVE Matches",
  "Educational / Tutorials / Advice",
  "Q&A / Fan Interaction",
  "Other (please specify below)"
];

const RADIO_OPTIONS = ["Yes", "No"];
const FREQUENCY_OPTIONS = ["0–2 times", "3–5 times", "6–10 times", "10+ times / Almost daily"];
const LENGTH_OPTIONS = ["Under 1 hour", "1–2 hours", "2–4 hours", "4+ hours"];

const STREAMING_DURATION_OPTIONS = [
  "Less than 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "1+ years"
];

const IMPROVEMENT_OPTIONS = [
  "Growing followers",
  "Monetization",
  "Viewer engagement",
  "Stream setup / overlays",
  "Content strategy",
  "Other"
];

const GIFT_OPTIONS = [
  "Yes regularly",
  "Sometimes",
  "Rarely",
  "Not yet"
];

function ApplicationForm() {
  const searchParams = useSearchParams();
  const recruiterId = searchParams.get('recruiter');
  const recruiter = recruiterId ? creators.find(c => c.id === recruiterId && c.tier === 'recruiter') : null;

  const [formData, setFormData] = useState({
    is18Plus: "",
    isUSCA: "",
    streamingCountry: "",
    contentTypes: [] as string[],
    otherContentType: "",
    nicheDescription: "",
    liveFrequency: "",
    averageSessionLength: "",
    streamingDuration: "",
    streamingGoals: "",
    improvements: [] as string[],
    otherImprovement: "",
    followerCount: "",
    receivesGifts: "",
    biggestChallenge: "",
    openToCoaching: "",
    otherAgency: "",
    otherAgencyName: "",
    tiktokHandle: "",
    discordId: "",
    emailAddress: "",
    additionalNotes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field if any
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleContentTypeToggle = (type: string) => {
    setFormData(prev => {
      const isSelected = prev.contentTypes.includes(type);
      let newTypes = [...prev.contentTypes];

      if (isSelected) {
        newTypes = newTypes.filter(t => t !== type);
      } else {
        if (newTypes.length < 3) {
          newTypes.push(type);
        }
      }

      // Clear error if we now have at least one selected
      if (newTypes.length > 0 && errors.contentTypes) {
        setErrors(e => { const newE = { ...e }; delete newE.contentTypes; return newE; });
      }

      return { ...prev, contentTypes: newTypes };
    });
  };

  const handleImprovementToggle = (opt: string) => {
    setFormData(prev => {
      const isSelected = prev.improvements.includes(opt);
      let newOpts = [...prev.improvements];

      if (isSelected) {
        newOpts = newOpts.filter(o => o !== opt);
      } else {
        newOpts.push(opt);
      }

      if (newOpts.length > 0 && errors.improvements) {
        setErrors(e => { const newE = { ...e }; delete newE.improvements; return newE; });
      }

      return { ...prev, improvements: newOpts };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.is18Plus) newErrors.is18Plus = "Required";
    if (!formData.isUSCA) newErrors.isUSCA = "Required";

    if (formData.isUSCA === "No" && !formData.streamingCountry.trim()) {
      newErrors.streamingCountry = "Required";
    }

    if (formData.contentTypes.length === 0) {
      newErrors.contentTypes = "Please select at least one content type.";
    }

    if (formData.contentTypes.includes("Other (please specify below)") && !formData.otherContentType.trim()) {
      newErrors.otherContentType = "Please specify your other content type.";
    }

    if (!formData.nicheDescription.trim()) newErrors.nicheDescription = "Required";
    if (!formData.liveFrequency) newErrors.liveFrequency = "Required";
    if (!formData.averageSessionLength) newErrors.averageSessionLength = "Required";

    if (!formData.streamingDuration) newErrors.streamingDuration = "Required";
    if (!formData.streamingGoals.trim()) newErrors.streamingGoals = "Required";

    if (formData.improvements.length === 0) {
      newErrors.improvements = "Please select at least one area to improve.";
    }

    if (formData.improvements.includes("Other") && !formData.otherImprovement.trim()) {
      newErrors.otherImprovement = "Please specify your other improvement goal.";
    }

    if (!formData.followerCount.trim()) newErrors.followerCount = "Required";
    if (!formData.receivesGifts) newErrors.receivesGifts = "Required";
    if (!formData.biggestChallenge.trim()) newErrors.biggestChallenge = "Required";
    if (!formData.openToCoaching) newErrors.openToCoaching = "Required";
    if (!formData.otherAgency) newErrors.otherAgency = "Required";

    if (formData.otherAgency === "Yes" && !formData.otherAgencyName.trim()) {
      newErrors.otherAgencyName = "Required";
    }

    if (!formData.tiktokHandle.trim()) newErrors.tiktokHandle = "Required";

    if (!formData.discordId.trim() && !formData.emailAddress.trim()) {
      newErrors.contact = "Either Discord ID or Email Address must be provided.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to top or show error summary if needed
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/apply/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recruiterId: recruiterId || undefined,
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
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6 border-t border-border mt-[68px]">
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
            Our team will review your submission and get back to you soon. Stay consistent on LIVE and let&apos;s build something great together.
          </p>
          <Link href="/" className="block w-full py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg shadow-primary/20">
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-24 overflow-hidden relative border-t border-border mt-[68px]">
      <div className="fixed inset-0 bg-dot-grid opacity-20 pointer-events-none mix-blend-screen" />
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />

      <Section className="relative z-10">
        <div className="max-w-3xl mx-auto auto-rows-max glass-card p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl">

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase">
              Creator <span className="text-gradient-primary">Intake Form</span>
            </h1>
            <p className="text-foreground-muted leading-relaxed">
              Join Peace Time Agency and level up your TikTok LIVE experience! We&apos;re here to support your growth, battles, and experiences in a positive creator network. Please fill out the following questions honestly and completely.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* 1. 18 or older */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                1. Are you 18 years or older? <span className="text-primary">*</span>
              </label>
              <div className="flex gap-4">
                {RADIO_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="is18Plus"
                      value={opt}
                      checked={formData.is18Plus === opt}
                      onChange={(e) => handleInputChange("is18Plus", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.is18Plus && <p className="text-xs text-primary font-bold">{errors.is18Plus}</p>}
              <p className="text-xs text-white/40 italic">Must be 18+ to join and participate in LIVE features.</p>
            </div>

            {/* 2. US/Canada */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                2. Are you located in the United States or Canada? <span className="text-primary">*</span>
              </label>
              <div className="flex gap-4">
                {RADIO_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isUSCA"
                      value={opt}
                      checked={formData.isUSCA === opt}
                      onChange={(e) => handleInputChange("isUSCA", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.isUSCA && <p className="text-xs text-primary font-bold">{errors.isUSCA}</p>}
              <p className="text-xs text-white/40 italic">Our primary support and features focus on US/CA creators at this time.</p>

              {/* Conditional Country Textbox */}
              <AnimatePresence>
                {formData.isUSCA === "No" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <label className="block text-xs font-bold text-white/60 mb-2">What country are you streaming from? <span className="text-primary">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter your country"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                      value={formData.streamingCountry}
                      onChange={(e) => handleInputChange("streamingCountry", e.target.value)}
                    />
                    {errors.streamingCountry && <p className="text-xs text-primary font-bold mt-1">{errors.streamingCountry}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Content Types */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                3. What type of content do you make on TikTok LIVE? (Select up to 3) <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONTENT_TYPES.map(type => (
                  <label key={type} className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.contentTypes.includes(type)}
                      onChange={() => handleContentTypeToggle(type)}
                      disabled={!formData.contentTypes.includes(type) && formData.contentTypes.length >= 3}
                      className="mt-1 w-4 h-4 rounded text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2 disabled:opacity-50"
                    />
                    <span className="text-sm text-white/80 leading-snug">{type}</span>
                  </label>
                ))}
              </div>
              {errors.contentTypes && <p className="text-xs text-primary font-bold">{errors.contentTypes}</p>}
              <p className="text-xs text-white/40 italic">Choose the categories that best describe your LIVE style/content.</p>

              {/* Conditional Other Textbox */}
              <AnimatePresence>
                {formData.contentTypes.includes("Other (please specify below)") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <input
                      type="text"
                      placeholder="Please describe your other content type"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                      value={formData.otherContentType}
                      onChange={(e) => handleInputChange("otherContentType", e.target.value)}
                    />
                    {errors.otherContentType && <p className="text-xs text-primary font-bold mt-1">{errors.otherContentType}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Niche Description */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                4. Please describe your niche/style (e.g. gaming format, IRL vibe, specific talent). <span className="text-primary">*</span>
              </label>
              <textarea
                className="w-full min-h-[100px] bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                placeholder="Tell us a little about your aesthetic and focus..."
                value={formData.nicheDescription}
                onChange={(e) => handleInputChange("nicheDescription", e.target.value)}
              />
              {errors.nicheDescription && <p className="text-xs text-primary font-bold">{errors.nicheDescription}</p>}
              <p className="text-xs text-white/40 italic">This helps us understand your vibe and how we can best support you.</p>
            </div>

            {/* 5. Frequency */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                5. How often do you plan to go LIVE per week? <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {FREQUENCY_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <input
                      type="radio"
                      name="liveFrequency"
                      value={opt}
                      checked={formData.liveFrequency === opt}
                      onChange={(e) => handleInputChange("liveFrequency", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.liveFrequency && <p className="text-xs text-primary font-bold">{errors.liveFrequency}</p>}
              <p className="text-xs text-white/40 italic">Consistency helps us plan support and campaigns for you.</p>
            </div>

            {/* Session Length */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                6. What is your average LIVE session length? <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {LENGTH_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <input
                      type="radio"
                      name="averageSessionLength"
                      value={opt}
                      checked={formData.averageSessionLength === opt}
                      onChange={(e) => handleInputChange("averageSessionLength", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.averageSessionLength && <p className="text-xs text-primary font-bold">{errors.averageSessionLength}</p>}
              <p className="text-xs text-white/40 italic">This helps us tailor tips and scheduling advice.</p>
            </div>

            {/* NEW QUESTIONS */}

            {/* Streaming Duration */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                7. How long have you been streaming on TikTok LIVE? <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {STREAMING_DURATION_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <input
                      type="radio"
                      name="streamingDuration"
                      value={opt}
                      checked={formData.streamingDuration === opt}
                      onChange={(e) => handleInputChange("streamingDuration", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.streamingDuration && <p className="text-xs text-primary font-bold">{errors.streamingDuration}</p>}
            </div>

            {/* Streaming Goals */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                8. What are your goals for streaming? <span className="text-primary">*</span>
              </label>
              <p className="text-xs text-white/40 italic">(Example: full-time income, growing a community, content creation, gaming career, etc.)</p>
              <textarea
                className="w-full min-h-[100px] bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                placeholder="Tell us what you want to achieve..."
                value={formData.streamingGoals}
                onChange={(e) => handleInputChange("streamingGoals", e.target.value)}
              />
              {errors.streamingGoals && <p className="text-xs text-primary font-bold">{errors.streamingGoals}</p>}
            </div>

            {/* Improvements */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                9. What do you want to improve most right now? (Select all that apply) <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {IMPROVEMENT_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.improvements.includes(opt)}
                      onChange={() => handleImprovementToggle(opt)}
                      className="mt-1 w-4 h-4 rounded text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-white/80 leading-snug">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.improvements && <p className="text-xs text-primary font-bold">{errors.improvements}</p>}

              {/* Conditional Other Textbox */}
              <AnimatePresence>
                {formData.improvements.includes("Other") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <input
                      type="text"
                      placeholder="Please specify what else you want to improve"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                      value={formData.otherImprovement}
                      onChange={(e) => handleInputChange("otherImprovement", e.target.value)}
                    />
                    {errors.otherImprovement && <p className="text-xs text-primary font-bold mt-1">{errors.otherImprovement}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Follower Count */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                10. What is your current follower count? <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 5,000"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                value={formData.followerCount}
                onChange={(e) => handleInputChange("followerCount", e.target.value)}
              />
              {errors.followerCount && <p className="text-xs text-primary font-bold">{errors.followerCount}</p>}
            </div>

            {/* Receives Gifts */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                11. Do you currently receive gifts on LIVE? <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {GIFT_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <input
                      type="radio"
                      name="receivesGifts"
                      value={opt}
                      checked={formData.receivesGifts === opt}
                      onChange={(e) => handleInputChange("receivesGifts", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.receivesGifts && <p className="text-xs text-primary font-bold">{errors.receivesGifts}</p>}
            </div>

            {/* Biggest Challenge */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                12. What is your biggest challenge with streaming right now? <span className="text-primary">*</span>
              </label>
              <textarea
                className="w-full min-h-[100px] bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                placeholder="Tell us what you struggle with most..."
                value={formData.biggestChallenge}
                onChange={(e) => handleInputChange("biggestChallenge", e.target.value)}
              />
              {errors.biggestChallenge && <p className="text-xs text-primary font-bold">{errors.biggestChallenge}</p>}
            </div>

            {/* Open to Coaching */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                13. Are you open to coaching and feedback to grow your streams? <span className="text-primary">*</span>
              </label>
              <div className="flex gap-4">
                {RADIO_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="openToCoaching"
                      value={opt}
                      checked={formData.openToCoaching === opt}
                      onChange={(e) => handleInputChange("openToCoaching", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.openToCoaching && <p className="text-xs text-primary font-bold">{errors.openToCoaching}</p>}
            </div>

            {/* Other Agency */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                14. Do you currently belong to another TikTok LIVE agency? <span className="text-primary">*</span>
              </label>
              <div className="flex gap-4">
                {RADIO_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="otherAgency"
                      value={opt}
                      checked={formData.otherAgency === opt}
                      onChange={(e) => handleInputChange("otherAgency", e.target.value)}
                      className="w-4 h-4 text-primary bg-white/5 border-white/20 focus:ring-primary focus:ring-2"
                    />
                    <span className="text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.otherAgency && <p className="text-xs text-primary font-bold">{errors.otherAgency}</p>}

              {/* Conditional Agency Name */}
              <AnimatePresence>
                {formData.otherAgency === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <label className="block text-xs font-bold text-white/60 mb-2">Agency Name <span className="text-primary">*</span></label>
                    <input
                      type="text"
                      placeholder="Type the name of your current agency"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                      value={formData.otherAgencyName}
                      onChange={(e) => handleInputChange("otherAgencyName", e.target.value)}
                    />
                    {errors.otherAgencyName && <p className="text-xs text-primary font-bold mt-1">{errors.otherAgencyName}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 15. TikTok Handle */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                15. TikTok Username (@) <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="@yourusername"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                value={formData.tiktokHandle}
                onChange={(e) => handleInputChange("tiktokHandle", e.target.value)}
              />
              {errors.tiktokHandle && <p className="text-xs text-primary font-bold">{errors.tiktokHandle}</p>}
              <p className="text-xs text-white/40 italic">Please provide your current main TikTok handle so we can review your profile.</p>
            </div>

            {/* Contact Group */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <div className="mb-2">
                <p className="text-sm font-bold text-white tracking-wide">Contact Information <span className="text-primary">*</span></p>
                <p className="text-xs text-white/50 mb-4 mt-1">Please provide at least one form of communication so we can reach you.</p>
                {errors.contact && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                    <p className="text-sm text-primary font-bold">{errors.contact}</p>
                  </div>
                )}
              </div>

              {/* 8. Discord ID */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/80 tracking-wide">
                  16. Discord ID
                </label>
                <input
                  type="text"
                  placeholder="Username#1234 or @mention"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                  value={formData.discordId}
                  onChange={(e) => handleInputChange("discordId", e.target.value)}
                />
                <p className="text-xs text-white/40 italic">Highly recommended! We use Discord for community chats, updates, training, and quick support.</p>
              </div>

              {/* 9. Email Address */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-white/80 tracking-wide">
                  17. Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white tracking-wide">
                Additional Notes (Optional)
              </label>
              <textarea
                className="w-full min-h-[80px] bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                placeholder="Goals, past battle experience, or why you're interested..."
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl transition-all uppercase tracking-widest text-sm shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit Application"}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
              <p className="text-center text-xs text-white/30 mt-4">
                Thank you for applying to Peace Time Agency! ☮️
              </p>
            </div>

          </form>

        </div>
      </Section>
    </main>
  );
}

export default function ApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-24 pb-12 flex items-center justify-center text-primary font-black uppercase tracking-widest text-sm mt-[68px]">Loading Form...</div>}>
      <ApplicationForm />
    </Suspense>
  );
}
