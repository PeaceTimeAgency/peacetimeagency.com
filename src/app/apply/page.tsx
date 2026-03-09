"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Link from "next/link";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            Our team will review your profile and reach out via email within 48 hours.
          </p>
          <Link href="/" className="block w-full py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-lg shadow-primary/20">
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
    <ApplicationForm />
  );
}
