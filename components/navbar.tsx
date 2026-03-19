"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-between items-center px-6 py-4 bg-[#F9F8F7] border-b border-[#2D2D2D] sticky top-0 z-50 shadow-sm"
    >
      {/* Logo */}
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-[#2D2D2D]"
      >
        BLISS
      </motion.h1>

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
        {/* WhatsApp Button Desktop */}
        <motion.a
          href="https://wa.me/919939476088"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, backgroundColor: "#25D366" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-[#D4AF37] flex items-center gap-2 text-white px-5 py-2 rounded-lg font-medium transition-all"
        >
          WhatsApp
        </motion.a>
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
            className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white"
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
                  className="text-white text-3xl font-semibold hover:text-[#D4AF37] transition"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/919939476088"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "#25D366" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="mt-8 bg-[#D4AF37] flex items-center gap-2 text-white px-8 py-3 rounded-lg text-xl font-medium transition"
            >
              WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}