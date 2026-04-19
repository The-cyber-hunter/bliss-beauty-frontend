"use client";

import Sidebar from "@/components/admin/sidebar";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className={`flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300 ${mobileOpen ? 'blur-sm pointer-events-none select-none' : 'md:ml-64'}`}>
        {children}
      </div>
    </div>
  );
}