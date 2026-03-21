import { checkSession } from "./actions";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { AdminToastProvider } from "@/components/admin/ui/AdminToast";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Admin Portal | Peace Time Agency",
};

export default async function AdminPage() {
  if (process.env.HIDE_ADMIN_PORTAL === "true") {
    notFound();
  }

  const isAuthed = await checkSession();

  return (
    <AdminToastProvider>
      <div className="min-h-screen bg-[#01020A] text-white relative overflow-hidden flex items-center justify-center p-4 md:p-10">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[140px] rounded-full animate-breathe" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[140px] rounded-full animate-pulse-soft" />
        </div>

        <div className={`relative z-10 w-full mx-auto flex flex-col items-center justify-center ${isAuthed ? 'max-w-7xl' : 'max-w-lg'}`}>
          {isAuthed ? <AdminDashboard /> : <AdminLogin />}
        </div>
        
        {/* Bottom Letterbox Bar */}
        <div className="absolute bottom-0 inset-x-0 h-[2%] bg-black/40 backdrop-blur-md border-t border-white/5 z-20 pointer-events-none" />
      </div>
    </AdminToastProvider>
  );
}
