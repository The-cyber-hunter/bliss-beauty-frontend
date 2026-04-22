"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"; 
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const services = [
    { name: "Hair Styling", img: "/haircut.jpg" },
    { name: "Facial Treatments", img: "/facial.jpg" },
    { name: "Waxing", img: "/waxing.jpg" },
  ];

  const faqs = [
    {
      question: "Do you provide home beauty services?",
      answer: "Yes, we provide professional beauty services at your home with trained experts.",
    },
    {
      question: "Can I visit your salon directly?",
      answer: "Yes, walk-ins are welcome at our premium salon.",
    },
    {
      question: "Do you offer bridal makeup services?",
      answer: "Yes, including HD, airbrush, and full wedding packages.",
    },
    {
      question: "How can I book a service?",
      answer: "Book easily via our website or call us.",
    },
    {
      question: "Do you offer training for beauticians?",
      answer:
        "Yes. BLISS Academy offers professional hands-on training for aspiring and working beauticians — see the Academy page for courses, duration, and how to enrol. Contact us for upcoming batch dates.",
    },
  ];

  return (
   <div className="min-h-screen flex flex-col bg-[#F9F8F7] text-[#2D2D2D]">
      <Navbar />
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Premium Beauty <br /> At Home & In Salon
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            Discover luxury beauty services with expert professionals. Relax, rejuvenate, and glow whether you choose our premium salon experience or convenient home services.
          </p>

          <p className="text-gray-500 mb-8">
            From quick grooming sessions to complete bridal transformations, we
            bring the salon experience right to your home with comfort,
            hygiene, and trust.
          </p>

          <div className="flex gap-4">
            <Link href="/services" className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl">
              Explore Services
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[450px] rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src="/hero.jpg"
            alt="Beauty"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </section>

      {/* SERVICE OPTIONS */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            className="p-8 border rounded-2xl shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-3">At Home Services</h3>
            <p className="text-gray-600 mb-4">
              Enjoy salon-quality beauty services in the comfort of your home.
              Our professionals bring everything needed for a safe and hygienic experience.
            </p>
            <ul className="text-gray-500 text-sm space-y-1">
              <li>✔ Convenient & time-saving</li>
              <li>✔ Hygienic & safe setup</li>
              <li>✔ Perfect for busy schedules</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            className="p-8 border rounded-2xl shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-3">Visit Our Salon</h3>
            <p className="text-gray-600 mb-4">
              Experience luxury at our fully equipped salon with a relaxing
              ambiance and premium beauty treatments.
            </p>
            <ul className="text-gray-500 text-sm space-y-1">
              <li>✔ Premium salon environment</li>
              <li>✔ Advanced equipment</li>
              <li>✔ Complete beauty experience</li>
            </ul>
          </motion.div>
        </div>
      </section >

      <section className="max-w-5xl mx-auto px-6 py-20 text-left">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          About BLISS
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative">
          <div
            className={`text-gray-600 leading-relaxed space-y-4 transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[180px] overflow-hidden"
              }`}
          >
            <p>
              BLISS Heaven of Beauty Salon & Academy is a premium destination for
              modern beauty, grooming, and wellness services. We are committed to
              delivering salon-quality experiences using high-end products,
              advanced techniques, and professionally trained experts.
            </p>

            <p>
              Whether you choose the comfort of at-home services or visit our
              fully equipped luxury salon, our goal is to provide a relaxing,
              hygienic, and personalized experience tailored to your needs.
            </p>

            <p>
              From everyday grooming to bridal transformations, our team ensures
              every client feels confident, beautiful, and cared for. We take
              pride in maintaining the highest standards of hygiene, safety,
              and customer satisfaction.
            </p>

            <p>
              At BLISS, beauty is not just a service — it’s an experience designed
              to help you relax, rejuvenate, and glow with confidence.
            </p>
          </div>

          {/* Fade Effect */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#F9F8F7] to-transparent"></div>
          )}
        </motion.div>

        {/* Read More Button */}
        <div className="text-center mt-6">
          <Link
            href="/about"
            className="text-[#D4AF37] font-medium hover:underline cursor-pointer"
          >
            Read More →
          </Link>
        </div>
      </section>

      <section className="bg-[#EFEAE4] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-12">
            Why Choose BLISS?
          </h2>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {[
              "Certified Professionals",
              "100% Hygiene & Safety",
              "Premium Products Used",
              "On-Time Service Guarantee",
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-2xl shadow-sm"
              >
                <p className="text-gray-700 font-medium">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* ACADEMY */}
      <section className="bg-white border-y border-[#E8E2D9]/80 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 relative h-[300px] sm:h-[360px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/facial.jpg"
              alt="Professional beauty training at BLISS Academy"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-5"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B]">
              BLISS Academy
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-[#2D2D2D]">
              5+ professional beauty courses
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Build your beauty career with structured training in skin, hair, and makeup.
              From basic foundation to full professional mastery, our academy is designed for
              beginners and working artists who want practical, job-ready skills.
            </p>
            <ul className="text-gray-600 text-sm space-y-2.5">
              <li className="flex gap-2">
                <span className="text-[#D4AF37] shrink-0">✔</span>
                <span>Certification provided after successful course completion</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#D4AF37] shrink-0">✔</span>
                <span>5+ course options: Basic, Makeup, Basic to Makeup, Hair Dresser, Full Course</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#D4AF37] shrink-0">✔</span>
                <span>100% practical training with real salon workflow and client handling</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/academy"
                className="inline-flex items-center justify-center bg-[#D4AF37] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#c9a432] transition-colors"
              >
                View courses
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-[#2D2D2D]/20 px-6 py-3 rounded-xl text-sm font-medium text-[#2D2D2D] hover:border-[#D4AF37] hover:text-[#B8860B] transition-colors"
              >
                Explore services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      < section className="max-w-6xl mx-auto px-6 py-20" >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">Our Services</h2>
          <Link href="/services" className="text-[#D4AF37] font-medium">
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06 }}>
              <div className="relative h-[220px]">
                <Image
                  src={service.img}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium">{service.name}</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Professional {service.name.toLowerCase()} services by trained experts.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section >

      {/* PROCESS */}
      < section className="bg-[#EFEAE4] py-20" >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {["Choose Service", "Book Appointment", "Relax & Enjoy"].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-2xl shadow"
              >
                <h3 className="text-xl font-medium mb-2">Step {i + 1}</h3>
                <p className="text-gray-600">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/bridal.jpg"
            alt="Bridal Makeup"
            fill
            className="object-cover object-[50%_20%]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            Bridal Makeup Packages
          </h2>

          <p className="text-gray-600 mb-4">
            Look flawless on your special day with our expert bridal makeup
            services designed to enhance your natural beauty and match your
            unique style.
          </p>

          <p className="text-gray-500 mb-6">
            From pre-wedding consultations to the final touch, we ensure a
            stress-free and luxurious experience with premium products and
            professional techniques.
          </p>

          {/* FEATURES */}
          <ul className="text-gray-600 text-sm space-y-2 mb-6">
            <li>✔ HD & Airbrush Makeup</li>
            <li>✔ Hairstyling & Draping</li>
            <li>✔ Premium International Products</li>
            <li>✔ Pre-Bridal Skin Preparation</li>
            <li>✔ Long-lasting Waterproof Finish</li>
          </ul>

          {/* CTA */}
          <div className="flex gap-4">
            <span className="inline-block bg-[#D4AF37] text-white text-sm px-4 py-1 rounded-full mb-4">
              Starting from ₹4,999
            </span>
            <Link
              href="/services"
              className="border border-[#2D2D2D] px-2 py-1 pt-2 rounded-xl hover:bg-[#D4AF37] hover:text-white transition"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold mb-4">
            Trusted by Hundreds of Happy Clients
          </h2>
          <p className="text-gray-500 mb-10">
            Rated 4.9★ by our customers for quality, hygiene, and professionalism
          </p>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              {
                name: "Riya Sharma",
                review:
                  "Absolutely loved the service! The beautician was very professional and everything was super hygienic.",
              },
              {
                name: "Neha Verma",
                review:
                  "Booked bridal makeup and it was perfect. Got so many compliments. Highly recommended!",
              },
              {
                name: "Pooja Singh",
                review:
                  "Super convenient home service. Saved my time and the results were amazing.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.04 }}
                className="p-6 border rounded-xl text-left shadow-sm"
              >
                <div className="text-[#D4AF37] mb-2">★★★★★</div>
                <p className="text-gray-600 text-sm mb-4">"{item.review}"</p>
                <h4 className="font-medium text-sm">{item.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* FAQ */}
      <section className="w-full px-6 md:px-8 lg:px-10 py-20">
        <div className="rounded-3xl bg-[#F5F1EB] p-6 md:p-10">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B] mb-2">
              FAQs
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2D2D2D]">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-3">
              Common questions about our salon services, home appointments, and BLISS Academy training.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 items-start">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`self-start rounded-2xl border transition-all ${
                    isOpen
                      ? "border-[#D4AF37]/60 bg-white shadow-sm"
                      : "border-[#E8E2D9] bg-white/85"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-start justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] md:text-[16px] font-semibold leading-snug text-[#2D2D2D]">
                      {faq.question}
                    </span>

                    <span
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-base transition-transform duration-300 ${
                        isOpen
                          ? "border-[#D4AF37] text-[#B8860B] rotate-45 bg-[#D4AF37]/10"
                          : "border-stone-300 text-stone-500 rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed text-sm md:text-[15px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#2D2D2D] text-white py-16 text-center"
      >
        <h2 className="text-3xl mb-4">Ready to Glow?</h2>
        <p className="max-w-xl mx-auto">
          We provide home beauty services and salon experiences across your city.
          Book easily and enjoy professional care wherever you are.
        </p>
        <p className="mb-6">Book your appointment today</p>
        <Link href="/services" className="bg-[#D4AF37] px-6 py-3 rounded-xl">
          Select Our Services
        </Link>
      </motion.section >
      <Footer />
    </div >
  );
}
