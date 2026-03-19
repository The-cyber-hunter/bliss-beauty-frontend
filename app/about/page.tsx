"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";

export default function About() {
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

                <div className="px-6 py-16 max-w-6xl mx-auto">

                    {/* HERO */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-12 items-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div>
                            <h1 className="text-4xl font-semibold mb-4">
                                About BLISS Beauty Salon
                            </h1>

                            <p className="text-gray-600 mb-4">
                                BLISS Heaven of Beauty Salon & Academy provides premium beauty
                                services at home and in salon. We specialize in skincare,
                                grooming, and bridal makeup with a focus on hygiene, comfort,
                                and customer satisfaction.
                            </p>

                            <p className="text-gray-500">
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
                            />
                        </div>
                    </motion.div>

                    {/* STORY */}
                    <motion.div
                        className="text-left max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <h2 className="text-3xl font-semibold mb-4 text-center">Our Story</h2>

                        <p className="text-gray-600 mb-4">
                            BLISS was founded with the vision of making professional beauty
                            services accessible, convenient, and reliable. Whether it's a
                            quick grooming session or a complete bridal transformation, we
                            bring expertise and luxury to every service.
                        </p>

                        <p className="text-gray-600">
                            Over the years, we have built trust with hundreds of happy clients
                            by maintaining high standards of hygiene, professionalism, and
                            personalized care.
                        </p>
                    </motion.div>

                    {/* WHY CHOOSE US */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-20 items-center mb-16"
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
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold mb-4">
                                Why Choose BLISS?
                            </h2>

                            <ul className="space-y-3 text-gray-600">
                                <li>✔ Certified & experienced professionals</li>
                                <li>✔ 100% hygiene and safety standards</li>
                                <li>✔ Premium products and modern techniques</li>
                                <li>✔ Home service convenience</li>
                                <li>✔ Personalized beauty solutions</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* SERVICES */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-semibold mb-4">
                            Our Beauty Services
                        </h2>

                        <p className="text-gray-600">
                            We offer a wide range of beauty services including facial
                            treatments, hair styling, waxing, skincare, and bridal makeup.
                            Our services are designed to provide convenience, comfort,
                            and premium results for every client.
                        </p>
                    </div>

                    {/* STATS */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Section Heading */}
                        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 col-span-full">
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
                                className="bg-white p-6 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition text-center flex flex-col items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <h3 className="text-2xl sm:text-xl md:text-2xl font-semibold text-[#D4AF37]">{stat.number}</h3>
                                <p className="text-sm sm:text-xs text-gray-500 mt-2">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* OUR COMMITMENT */}
                    <div className="py-12 px-6 rounded-2xl ">
                        <h2 className="text-3xl font-semibold text-center mb-8">
                            Our Commitment to You
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {[
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
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-[#F9F8F7] p-6 rounded-2xl shadow-sm hover:shadow-md transition"
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
                </div>

            </div>
            <Footer />
        </>
    );
}