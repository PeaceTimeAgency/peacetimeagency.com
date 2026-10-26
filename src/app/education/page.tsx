
import Link from "next/link";

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[#01020A] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-primary font-bold uppercase tracking-widest mb-4">
          Peace Time Agency
        </p>

        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Education Center
        </h1>

        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
          Your exclusive destination for TikTok LIVE education,
          creator development, streaming tutorials, and
          strategies to help you grow.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Exclusive Creator Resources
          </h2>

          <p className="text-white/60 mb-8">
            Our training library is reserved for Peace Time
            Agency creators. Explore educational videos,
            platform tips, and tools designed to help you
            succeed on TikTok LIVE.
          </p>

          <Link
            href="/creator-portal"
            className="inline-block bg-primary hover:opacity-90 text-white font-bold px-8 py-3 rounded-lg transition"
          >
            Creator Login
          </Link>
        </div>
      </div>
    </main>
  );
}
