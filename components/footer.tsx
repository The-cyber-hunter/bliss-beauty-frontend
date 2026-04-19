"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4">About BLISS</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Premium beauty salon & academy offering home & salon services, bridal makeup, skincare, and professional grooming. We ensure hygiene, comfort, and high-quality experiences.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>
              <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#D4AF37]">Services</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#D4AF37]">About Us</Link>
            </li>
            <li>
              <Link href="/academy" className="hover:text-[#D4AF37]">Academy</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#D4AF37]">Contact</Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <a
            href="https://www.google.com/maps?q=Sindhora+Road+Natiniyadai+Mandir+Varanasi"
            target="_blank"
            rel="noopener noreferrer"
           className="flex items-start gap-2 text-gray-300 text-sm mb-3 hover:text-[#D4AF37] transition"
          >
             <MapPin size={18} className="mt-1" />Sindhora Road, Natiniyadai Mandir, Varanasi
          </a>
          <a
            href="tel:+919939476088"
            className="flex items-center gap-2 text-gray-300 text-sm mb-3 hover:text-[#D4AF37] transition"
          >
              <Phone size={18} />+91 9939476088
          </a>

          <a
            href="mailto:info@blissbeauty.com"
            className="flex items-center gap-2 text-gray-300 text-sm hover:text-[#D4AF37] transition"
          >
             <Mail size={18} /> info@blissbeauty.com
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/61583730351672/"
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black transition"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.instagram.com/bliss_salon01?igsh=MTZ6ODIzNzljN3kxZA=="
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black transition"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://twitter.com/yourpage"
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black transition"
              >
                <FaTwitter size={16} />
              </a>
            </div>
        </motion.div>

      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center text-gray-400 text-sm"
      >
        © {new Date().getFullYear()} BLISS Beauty Salon. All Rights Reserved.
      </motion.div>
    </footer>
  );
}