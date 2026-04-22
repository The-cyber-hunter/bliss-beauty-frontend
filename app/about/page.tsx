"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
    const commitments = [
        {
            title: "Quality Service",
            desc: "We use premium products and proven techniques to deliver consistent, high-quality results for every client."
        },
        {
            title: "Hygiene & Safety",
            desc: "Strict hygiene protocols ensure a safe and clean experience, whether at home or in our salon."
        },
        {
            title: "Customer Satisfaction",
            desc: "Your satisfaction is our priority. We focus on personalized care to meet your unique beauty needs."
        }
    ];
    const brandValues = [
        {
            title: "Luxury with care",
            desc: "Premium experience designed around comfort, calm, and visible results."
        },
        {
            title: "Hygiene first",
            desc: "Sterilised tools, clean setup, and safety-led processes in every appointment."
        },
        {
            title: "Personalised beauty",
            desc: "Every service is tailored to your skin, hair, event, and personal style."
        }
    ];
    const processSteps = [
        "Consultation and skin/hair assessment",
        "Custom service plan and product selection",
        "Professional execution by trained experts",
        "Aftercare guidance and follow-up support"
    ];
    const quickHighlights = [
        "Trusted by 500+ happy clients",
        "Certified team and premium products",
        "Salon luxury with home convenience"
    ];
    const academyHighlights = [
        "5+ structured courses",
        "Certification after completion",
        "100% practical learning"
    ];

    return (
        <>
            {/* SEO META */}
            <Head>
                <title>About BLISS Beauty Salon | Home & Salon Services</title>
                <meta
                    name="description"
                    content="BLISS Beauty Salon offers premium beauty services at home and in salon including bridal makeup, facials, hair styling, and skincare. Trusted professionals and hygienic services."
                />
                <meta
                    name="keywords"
                    content="beauty salon, home beauty services, bridal makeup, facial services, hair styling, salon near me"
                />
            </Head>

            <div className="min-h-screen bg-[#F9F8F7] text-[#2D2D2D]">
                <Navbar />
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
                    <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-[#D4AF37]/[0.07] blur-3xl" />
                    <div className="absolute -left-20 bottom-32 h-80 w-80 rounded-full bg-stone-300/20 blur-3xl" />
                </div>

                <div className="w-full px-4 md:px-6 lg:px-8 py-12 md:py-14 space-y-8 md:space-y-10">

                    {/* HERO */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl border border-[#E8E2D9] bg-white p-5 md:p-8 shadow-sm"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-semibold mb-3">
                                About BLISS Beauty Salon
                            </h1>

                            <p className="text-gray-600 text-sm md:text-base mb-3">
                                BLISS Heaven of Beauty Salon & Academy provides premium beauty
                                services at home and in salon. We specialize in skincare,
                                grooming, and bridal makeup with a focus on hygiene, comfort,
                                and customer satisfaction.
                            </p>

                            <p className="text-gray-500 text-sm md:text-base">
                                Our goal is to deliver high-quality beauty experiences using
                                expert techniques and trusted products, ensuring every client
                                feels confident and radiant.
                            </p>
                        </div>

                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/about1.jpg"
                                alt="Beauty salon services"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* STORY */}
                    <motion.div
                        className="text-left w-full rounded-3xl border border-[#E8E2D9] bg-[#FCFBF9] px-5 md:px-8 py-6 md:py-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-center">Our Story</h2>

                        <p className="text-gray-600 text-sm md:text-base mb-3">
                            BLISS was founded with the vision of making professional beauty
                            services accessible, convenient, and reliable. Whether it's a
                            quick grooming session or a complete bridal transformation, we
                            bring expertise and luxury to every service.
                        </p>

                        <p className="text-gray-600 text-sm md:text-base">
                            Over the years, we have built trust with hundreds of happy clients
                            by maintaining high standards of hygiene, professionalism, and
                            personalized care.
                        </p>
                    </motion.div>

                    {/* SIGNATURE VALUES */}
                    <motion.section
                        className="rounded-3xl border border-[#E8E2D9] bg-white p-5 md:p-8 shadow-sm"
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B] mb-2">
                                Signature values
                            </p>
                            <h2 className="text-2xl md:text-3xl font-semibold">What defines the BLISS experience</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5">
                            {brandValues.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    className="rounded-2xl border border-[#E8E2D9] bg-[#FCFBF9] p-5"
                                >
                                    <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* WHY CHOOSE US */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl bg-white/80 p-5 md:p-7 border border-[#E8E2D9]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ">
                            <Image
                                src="/about2.jpg"
                                alt="Professional beautician at work"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                                Why Choose BLISS?
                            </h2>

                            <ul className="space-y-2.5 text-gray-600 text-sm md:text-base">
                                <li>✔ Certified & experienced professionals</li>
                                <li>✔ 100% hygiene and safety standards</li>
                                <li>✔ Premium products and modern techniques</li>
                                <li>✔ Home service convenience</li>
                                <li>✔ Personalized beauty solutions</li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="rounded-3xl border border-[#E8E2D9] bg-white p-5 md:p-7 shadow-sm"
                    >
                        <h3 className="text-xl md:text-2xl font-semibold text-center mb-5">Why clients trust BLISS</h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {quickHighlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-[#E8E2D9] bg-[#FCFBF9] px-5 py-5 md:px-6 md:py-6"
                                >
                                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B8860B] text-sm font-semibold mb-3">
                                        ✓
                                    </div>
                                    <p className="text-sm md:text-base font-medium text-[#2D2D2D] leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ACADEMY — same section pattern as “Why Choose BLISS?” (open grid, no card) */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center rounded-3xl border border-[#E8E2D9] bg-white p-5 md:p-8 shadow-sm"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                                BLISS Academy
                            </h2>

                            <p className="text-gray-600 text-sm md:text-base mb-3">
                                Alongside our salon services, we offer 5+ structured academy courses for students
                                and beauty professionals who want to build strong, career-focused skills in skin,
                                hair, and makeup.
                            </p>

                            <ul className="space-y-2.5 text-gray-600 text-sm md:text-base mb-6">
                                <li>✔ Certification provided after successful completion</li>
                                <li>✔ 5+ courses from basic beauty to full professional training</li>
                                <li>✔ 100% practical training with real salon standards and client handling</li>
                            </ul>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/academy"
                                    className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#c9a432] transition-colors"
                                >
                                    View courses
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border border-[#2D2D2D]/20 px-6 py-3 rounded-xl font-medium text-[#2D2D2D] hover:border-[#D4AF37] hover:text-[#B8860B] transition-colors"
                                >
                                    Enquire about batches
                                </Link>
                            </div>
                        </div>

                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/facial.jpg"
                                alt="BLISS Academy professional training"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>

                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="rounded-3xl border border-[#E8E2D9] bg-gradient-to-br from-white to-[#F7F2E9] p-5 md:p-7 shadow-sm"
                    >
                        <h3 className="text-xl md:text-2xl font-semibold text-center mb-5">Academy highlights</h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {academyHighlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-[#E8E2D9] bg-white px-5 py-5 md:px-6 md:py-6"
                                >
                                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B8860B] text-sm font-semibold mb-3">
                                        ★
                                    </div>
                                    <p className="text-sm md:text-base font-semibold text-[#2D2D2D] leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* SERVICES — same grid pattern as “Why Choose BLISS?”: image + structured copy */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center rounded-3xl bg-[#FCFBF9] border border-[#E8E2D9] p-5 md:p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/waxing.jpg"
                                alt="Beauty and grooming services at BLISS"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-2.5">
                                Our Beauty Services
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base mb-5">
                                One menu for salon visits and at-home bookings — professional care, hygienic setup,
                                and products chosen for Indian skin and hair.
                            </p>

                            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#B8860B] mb-2">
                                Facials, hair & body
                            </h3>
                            <ul className="space-y-2 text-gray-600 text-sm md:text-base mb-5">
                                <li>✔ Facials, cleanup, bleach & skin treatments</li>
                                <li>✔ Haircuts, styling, colour & occasion looks</li>
                                <li>✔ Waxing, massages, manicure & pedicure</li>
                            </ul>

                            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#B8860B] mb-2">
                                Bridal & events
                            </h3>
                            <ul className="space-y-2 text-gray-600 text-sm md:text-base mb-5">
                                <li>✔ HD, airbrush & party makeup with trials</li>
                                <li>✔ Looks planned around outfit, lighting & timeline</li>
                                <li>✔ Packages & seasonal offers on popular services</li>
                            </ul>

                            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#B8860B] mb-2">
                                Salon or home
                            </h3>
                            <ul className="space-y-2 text-gray-600 text-sm md:text-base mb-6">
                                <li>✔ Same team and standards — visit us or book at home</li>
                                <li>✔ Consultation first; advice matched to your goals</li>
                            </ul>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/services"
                                    className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#c9a432] transition-colors"
                                >
                                    Explore all services
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border border-[#2D2D2D]/20 px-6 py-3 rounded-xl font-medium text-[#2D2D2D] hover:border-[#D4AF37] hover:text-[#B8860B] transition-colors"
                                >
                                    Book / enquire
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* HOW WE WORK */}
                    <motion.section
                        className="rounded-3xl border border-[#E8E2D9] bg-white p-5 md:p-8 shadow-sm"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Our service process</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            {processSteps.map((step, i) => (
                                <div key={step} className="rounded-2xl border border-[#E8E2D9] bg-[#FCFBF9] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#B8860B] mb-2">
                                        Step {i + 1}
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* STATS */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 px-2 md:px-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Section Heading */}
                        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 col-span-full">
                            By the Numbers
                        </h2>

                        {/* Stats */}
                        {[
                            { number: "500+", label: "Happy Clients" },
                            { number: "5+", label: "Years Experience" },
                            { number: "100%", label: "Hygiene Focus" },
                            { number: "4.9★", label: "Client Rating" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-5 sm:p-4 rounded-2xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition text-center flex flex-col items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <h3 className="text-xl sm:text-xl md:text-2xl font-semibold text-[#D4AF37]">{stat.number}</h3>
                                <p className="text-sm sm:text-xs text-gray-500 mt-2">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* OUR COMMITMENT */}
                    <div className="py-10 px-4 md:px-6 rounded-3xl border border-[#E8E2D9] bg-white shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                            Our Commitment to You
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            {commitments.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-[#FCFBF9] p-5 rounded-2xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                >
                                    <h3 className="text-lg font-medium mb-3 text-[#D4AF37]">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                    {/* FOUNDER NOTE + CTA */}
                    <motion.section
                        className="rounded-3xl border border-[#E8E2D9] bg-gradient-to-br from-[#2D2D2D] to-[#3A3A3A] text-white p-6 md:p-9"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-3">A note from BLISS</p>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-3">Beauty with trust, training, and transformation</h2>
                        <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-3xl">
                            We built BLISS to deliver genuine value: premium services, practical academy learning, and a caring team
                            clients can rely on. Whether you visit our salon or call us home, our promise is the same quality every time.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <Link
                                href="/services"
                                className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#c9a432] transition-colors"
                            >
                                Explore services
                            </Link>
                            <Link
                                href="/contact"
                                className="border border-white/35 px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                            >
                                Book consultation
                            </Link>
                        </div>
                    </motion.section>
                </div>

            </div>
            <Footer />
        </>
    );
}