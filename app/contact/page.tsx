"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Sparkles, Scissors } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const PHONE_DISPLAY = "+91 9939476088";
const PHONE_TEL = "+919939476088";
const EMAIL = "info@blissbeauty.com";
const ADDRESS = "Sindhora Road, Natiniyadai Mandir, Varanasi";
const MAPS_URL =
  "https://www.google.com/maps?q=Sindhora+Road+Natiniyadai+Mandir+Varanasi";
const WHATSAPP_URL = "https://wa.me/919939476088";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name || "guest"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F7] text-[#2D2D2D]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-[#D4AF37]/[0.08] blur-3xl" />
        <div className="absolute -left-16 bottom-24 h-72 w-72 rounded-full bg-stone-300/20 blur-3xl" />
      </div>

      <Navbar />

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-14 pb-8 md:pt-20 md:pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B] mb-2">
              Get in touch
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Visit us in Varanasi, call, email, or send a message — we&apos;ll get back to you as soon as we can.
            </p>
          </motion.div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left: cards */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-[#D4AF37]/40 hover:shadow-md transition-all"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
                  <MapPin className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-semibold text-[#2D2D2D] mb-1">Address</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{ADDRESS}</p>
                  <span className="text-[#D4AF37] text-sm font-medium mt-1 inline-block">
                    Open in Maps →
                  </span>
                </div>
              </a>

              <a
                href={`tel:${PHONE_TEL}`}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-[#D4AF37]/40 hover:shadow-md transition-all"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
                  <Phone className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-semibold text-[#2D2D2D] mb-1">Phone</h2>
                  <p className="text-gray-600 text-sm">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-[#D4AF37]/40 hover:shadow-md transition-all"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
                  <Mail className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-semibold text-[#2D2D2D] mb-1">Email</h2>
                  <p className="text-gray-600 text-sm">{EMAIL}</p>
                </div>
              </a>

              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
                  <Clock className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-semibold text-[#2D2D2D] mb-1">Hours</h2>
                  <p className="text-gray-600 text-sm">
                    Call us for current opening hours and same-day availability.
                  </p>
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Right: form — same visual weight as left cards (rounded-2xl, p-5, shadow-sm) */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm h-fit self-start"
            >
              <h2 className="text-lg font-semibold text-[#2D2D2D] mb-0.5">Send a message</h2>
              <p className="text-xs text-gray-500 mb-4 leading-snug">
                Opens your email app with your message ready to send.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-3">
                  <div className="sm:col-span-1">
                    <label htmlFor="contact-name" className="text-xs font-bold text-[#2D2D2D]">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm text-[#2D2D2D] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="contact-email" className="text-xs font-bold text-[#2D2D2D]">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm text-[#2D2D2D] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-xs font-bold text-[#2D2D2D]">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm text-[#2D2D2D] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20"
                    placeholder="10-digit mobile"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs font-bold text-[#2D2D2D]">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="mt-1 min-h-[4.5rem] max-h-32 w-full resize-y rounded-xl border border-stone-200 px-3 py-2 text-sm text-[#2D2D2D] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20"
                    placeholder="Booking, academy, bridal…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#D4AF37] py-2.5 text-sm font-semibold text-white hover:bg-[#c9a432] transition-colors"
                >
                  Send via email
                </button>
              </form>
              <p className="text-[11px] text-gray-500 mt-3 text-center leading-tight">
                WhatsApp: use the button in the column beside this form.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 md:mt-16 max-w-2xl mx-auto"
          >
            <p className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#B8860B] mb-4">
              Explore BLISS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-stretch">
              <Link
                href="/services"
                className="group flex flex-1 min-h-[4.5rem] sm:min-h-[5rem] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-8 py-5 text-lg font-semibold text-white shadow-md shadow-[#D4AF37]/25 transition hover:bg-[#c9a432] hover:shadow-lg"
              >
                <Scissors className="h-7 w-7 shrink-0 opacity-95" strokeWidth={1.75} />
                <span>Browse services</span>
              </Link>
              <Link
                href="/academy"
                className="group flex flex-1 min-h-[4.5rem] sm:min-h-[5rem] items-center justify-center gap-3 rounded-2xl border-2 border-[#2D2D2D]/15 bg-white px-8 py-5 text-lg font-semibold text-[#2D2D2D] shadow-sm transition hover:border-[#D4AF37] hover:text-[#B8860B] hover:shadow-md"
              >
                <Sparkles className="h-7 w-7 shrink-0 text-[#D4AF37]" strokeWidth={1.75} />
                <span>Academy courses</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
