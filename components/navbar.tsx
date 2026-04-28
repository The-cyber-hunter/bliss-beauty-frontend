"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Academy", href: "/academy" },
    { name: "Our Services", href: "/services" },
    { name: "Track Booking", href: "/track-booking" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-between items-center px-8 py-5 bg-gradient-to-r from-[#F5F1EC]/80 via-[#F8F5F0]/70 to-[#F5F1EC]/80  border-b border-[#E8E2D9]/60 sticky top-0 z-50 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
    >
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
      {/* Logo */}
      <Link href="/">
        <div className="relative h-12 w-auto">
          <Image
            src="/logo.png"
            alt="Bliss Heaven of Beauty Logo"
            width={200}
            height={80}
            className="object-contain h-full w-auto"
          />
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 items-center text-[#2D2D2D]">
        {links.map((link, i) => (
          <motion.div
            key={link.name}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
          >
            <Link
              href={link.href}
              className="hover:text-[#9E7E73] transition-all duration-300"
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
        {/* Contact — desktop */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/contact"
            className="bg-[#D4AF37] flex items-center gap-2 text-white px-5 py-2 rounded-lg font-medium transition-all hover:bg-[#c9a432]"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Overlay Menu Toggle Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#2D2D2D]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-md flex flex-col justify-center items-center z-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-[#2D2D2D]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Links */}
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="my-4"
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#2D2D2D] text-3xl font-semibold hover:text-[#D4AF37] transition"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-[#D4AF37] inline-flex items-center gap-2 text-white px-8 py-3 rounded-lg text-xl font-medium transition hover:bg-[#c9a432]"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}