"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GraduationCap, Clock, BookOpen, Sparkles } from "lucide-react";

const courses = [
  {
    title: "Diploma in Beauty Therapy",
    duration: "4–6 months",
    level: "Beginner → Intermediate",
    description:
      "Full foundation in salon-ready skills: skin science, facials, cleanup, waxing, and client consultation.",
    topics: ["Skin types & analysis", "Classic & advanced facials", "Hygiene & sterilisation", "Retail & upselling basics"],
  },
  {
    title: "Professional Makeup Artistry",
    duration: "6–10 weeks",
    level: "Beginner → Advanced",
    description:
      "From everyday looks to editorial and bridal — colour theory, contouring, and long-wear techniques.",
    topics: ["HD & airbrush", "Bridal & party makeup", "Corrective makeup", "Kit building & hygiene"],
  },
  {
    title: "Hair Styling & Dressing",
    duration: "6–8 weeks",
    level: "Beginner → Intermediate",
    description:
      "Blow-dry, updos, braiding, and occasion styling using professional tools and products.",
    topics: ["Blow-dry & tong work", "Bridal buns & braids", "Product knowledge", "Quick salon styling"],
  },
  {
    title: "Skin & Facial Specialist",
    duration: "4–8 weeks",
    level: "Intermediate",
    description:
      "Deeper focus on advanced facial protocols, massage, and problem-skin approaches used in premium salons.",
    topics: ["Advanced facial massage", "Peels & protocols", "Sensitive & acne-prone skin", "Aftercare"],
  },
  {
    title: "Bridal & Occasion Specialist",
    duration: "6–8 weeks",
    level: "Advanced",
    description:
      "End-to-end bridal workflows: trials, timelines, coordination with stylists, and long-lasting finishes.",
    topics: ["Trial & consultation", "HD / airbrush bridal", "Hairstyling coordination", "Touch-up kits"],
  },
];

const whyAcademy = [
  {
    title: "Salon-connected training",
    body: "Learn the same hygiene, service, and quality standards we use with real clients every day.",
    icon: Sparkles,
  },
  {
    title: "Hands-on practice",
    body: "Guided demos, supervised practice, and feedback so techniques stick before you work independently.",
    icon: BookOpen,
  },
  {
    title: "Flexible batches",
    body: "Weekday and weekend options where available — ask us for the next intake dates.",
    icon: Clock,
  },
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F7] text-[#2D2D2D]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-[#D4AF37]/[0.07] blur-3xl" />
        <div className="absolute -left-20 bottom-32 h-80 w-80 rounded-full bg-stone-300/20 blur-3xl" />
      </div>

      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 md:pt-20 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B] mb-3">
                BLISS Academy
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Courses for{" "}
                <span className="bg-gradient-to-r from-[#B8860B] to-[#D4AF37] bg-clip-text text-transparent">
                  future beauticians
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-xl">
                Structured programs in makeup, hair, skin, and bridal — taught with professional products,
                strong hygiene habits, and real salon expectations so you graduate job-ready.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#c9a432] transition-colors"
                >
                  <GraduationCap className="h-5 w-5" strokeWidth={2} />
                  Enquire now
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center border border-stone-300 px-6 py-3 rounded-xl text-sm font-medium hover:border-[#D4AF37] hover:text-[#B8860B] transition-colors"
                >
                  See salon services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="relative h-[280px] sm:h-[360px] rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="/haircut.jpg"
                alt="Students and trainers at BLISS Academy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium drop-shadow-md">
                Small batches · Certified trainers · Hands-on kits
              </p>
            </motion.div>
          </div>
        </section>

        {/* Course cards */}
        <section className="bg-white border-y border-[#E8E2D9]/80 py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-12 md:mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-3">Academic courses</h2>
              <p className="text-gray-600">
                Choose a track that matches your goals. Duration and exact modules may vary by batch — we&apos;ll
                confirm details when you enrol.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {courses.map((course, i) => (
                <motion.article
                  key={course.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-2xl border border-stone-200/90 bg-[#FDFCFA] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-[#2D2D2D] pr-2">{course.title}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#B8860B] shrink-0">
                      {course.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#D4AF37]" strokeWidth={2} />
                    {course.duration}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    You&apos;ll cover
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    {course.topics.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-[#D4AF37] shrink-0">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Why academy */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-center mb-10 md:mb-12">Why train at BLISS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyAcademy.map((item, i) => {
              const Icon = item.icon;
              return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] mb-4 mx-auto ring-1 ring-[#D4AF37]/20">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#2D2D2D] text-white py-14 md:py-16 text-center px-6"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Ready to enrol?</h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-6 text-sm md:text-base">
            Call us or visit the salon to check batch dates, fees, and kit inclusions. We&apos;ll help you pick
            the right course for your experience level.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex bg-[#D4AF37] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#c9a432] transition-colors"
            >
              Contact us
            </Link>
            <Link
              href="/"
              className="inline-flex border border-white/30 px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
