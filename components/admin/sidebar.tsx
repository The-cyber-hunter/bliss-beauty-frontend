"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

const links = [
  { name: "Dashboard", href: "/admin" },
  { name: "Slots", href: "/admin/slots" },
  { name: "Bookings", href: "/admin/bookings" },
  { name: "Enrollments", href: "/admin/enrollments" },
  { name: "Coupons", href: "/admin/offers" },
  { name: "Promotions", href: "/admin/promotions" },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter();
  // Close sidebar on route change (for mobile UX)
  useEffect(() => {
    setMobileOpen(false);
    // eslint-disable-next-line
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin-login");
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 bg-white/90 rounded-full p-2 shadow-lg border border-white/40 hover:bg-yellow-50 transition-all ${mobileOpen ? 'hidden' : ''}`}
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#D4AF37" strokeWidth="2">
          <line x1="4" y1="7" x2="20" y2="7" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4" y1="12" x2="20" y2="12" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4" y1="17" x2="20" y2="17" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      {/* Sidebar itself */}
      {/* Desktop sidebar: always visible, not animated */}
      <aside
        className="hidden md:flex w-64 fixed inset-0 top-0 left-0 flex-col p-6 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl z-30"
        style={{ boxSizing: 'border-box' }}
      >
        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-[#D4AF37] to-yellow-600 bg-clip-text text-transparent select-none">
          Bliss Admin
        </h1>
        <nav className="flex-1 space-y-3">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    active
                      ? "bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md"
                      : "hover:bg-yellow-100/60 text-gray-800"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-2 rounded-xl bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow hover:from-red-500 hover:to-red-700 transition-all duration-300"
        >
          Logout
        </button>
        <div className="mt-10 text-xs text-gray-400 text-center select-none">
          &copy; {new Date().getFullYear()} Bliss Beauty
        </div>
      </aside>
      {/* Mobile sidebar: animated slide-in */}
      <motion.aside
        initial={false}
        animate={{
          x: mobileOpen ? 0 : -300,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden w-64 fixed inset-0 top-0 left-0 flex flex-col p-6 bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-2xl z-40 transition-transform duration-300"
        style={{ boxSizing: 'border-box' }}
      >
      {/* ...existing code... */}
        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-[#D4AF37] to-yellow-600 bg-clip-text text-transparent select-none">
          Bliss Admin
        </h1>
        <nav className="flex-1 space-y-3">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    active
                      ? "bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md"
                      : "hover:bg-yellow-100/60 text-gray-800"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-2 rounded-xl bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow hover:from-red-500 hover:to-red-700 transition-all duration-300"
        >
          Logout
        </button>
        <div className="mt-10 text-xs text-gray-400 text-center select-none">
          &copy; {new Date().getFullYear()} Bliss Beauty
        </div>
      </motion.aside>
    </>
  );
}