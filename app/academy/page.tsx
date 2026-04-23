"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GraduationCap, Clock, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const courses = [
  {
    id: "basic-course",
    title: "Basic Course",
    duration: "1 month",
    level: "INR 15,000",
    fee: 15000,
    description:
      "Fundamentals of beauty, skincare, and grooming.",
    topics: ["Beauty fundamentals", "Skincare basics", "Core grooming techniques", "Beginner practical sessions"],
  },
  {
    id: "makeup-course",
    title: "Makeup Course",
    duration: "2 months",
    level: "INR 30,000",
    fee: 30000,
    description:
      "Professional makeup, bridal looks, and client handling.",
    topics: ["Professional makeup techniques", "Bridal makeup looks", "Client consultation basics", "Product and hygiene standards"],
  },
  {
    id: "basic-to-makeup",
    title: "Basic to Makeup",
    duration: "4 months",
    level: "INR 50,000",
    fee: 50000,
    description:
      "Complete foundation and advanced makeup training.",
    topics: ["Beauty and skincare foundation", "Intermediate to advanced makeup", "Bridal and occasion looks", "Professional practice workflow"],
  },
  {
    id: "hair-dresser-course",
    title: "Hair Dresser Course",
    duration: "2 months",
    level: "INR 30,000",
    fee: 30000,
    description:
      "Hair cutting, styling, and chemical treatments.",
    topics: ["Hair cutting fundamentals", "Hair styling for clients", "Chemical treatment basics", "Salon hygiene and safety"],
  },
  {
    id: "full-course",
    title: "Full Course",
    duration: "6 months",
    level: "INR 100,000",
    fee: 100000,
    description:
      "Hair, skin, and makeup all-in-one professional training.",
    topics: ["Professional hair training", "Skin and facial training", "Makeup and bridal mastery", "Complete salon-ready skill set"],
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

const academyHighlights = [
  "Certification Provided",
  "5+ Courses",
  "100% Practical Training",
];

const CountdownTimer = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const end = new Date(endDate).getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const remaining = Math.max(0, Math.floor((end - now) / 1000));
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (timeLeft <= 0) {
    return (
      <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
        Offer Expired
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days.toString().padStart(2, "0")}:${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-md inline-block">
      ⏳ Ends in {formatTime(timeLeft)}
    </div>
  );
};

export default function AcademyPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [activeOffers, setActiveOffers] = useState<any[]>([]);
  const [activePromotions, setActivePromotions] = useState<any[]>([]);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) ?? courses[0],
    [selectedCourseId]
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  useEffect(() => {
    const fetchAcademyDeals = async () => {
      try {
        const [offersRes, promosRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/academy-enrollments/active-offers`, { cache: "no-store" }),
          fetch(`${BACKEND_URL}/api/academy-enrollments/active-promotions`, { cache: "no-store" }),
        ]);
        const [offersData, promosData] = await Promise.all([offersRes.json(), promosRes.json()]);
        if (offersData.success) setActiveOffers(offersData.offers || []);
        if (promosData.success) setActivePromotions(promosData.promotions || []);
      } catch (error) {
        console.error("Failed to fetch academy deals:", error);
      }
    };
    fetchAcademyDeals();
  }, [BACKEND_URL]);

  useEffect(() => {
    setCoupon("");
    setDiscount(0);
    setCouponMsg("");
  }, [selectedCourseId]);

  const getApplicableAcademyPromotion = (courseTitle: string) =>
    activePromotions.find((p: any) => p.serviceName === courseTitle) ||
    activePromotions.find((p: any) => !p.serviceName);

  const getApplicableAcademyOffer = (courseTitle: string) =>
    activeOffers.find((o: any) => o.serviceName === courseTitle);


  const getAutoDiscountedPrice = (course: (typeof courses)[number]) => {
    let amount = course.fee;
    const promo = getApplicableAcademyPromotion(course.title);
    if (promo) {
      const d =
        promo.discountType === "percentage"
          ? Math.round((amount * promo.discountValue) / 100)
          : promo.discountValue;
      amount = Math.max(amount - d, 0);
    }
    const offer = getApplicableAcademyOffer(course.title);
    if (offer) {
      const d =
        offer.discountType === "percentage"
          ? Math.round((amount * offer.discountValue) / 100)
          : offer.discountValue;
      amount = Math.max(amount - d, 0);
    }
    return amount;
  };

  const selectedCourseAutoPrice = getAutoDiscountedPrice(selectedCourse);
  const finalPayable = Math.max(selectedCourseAutoPrice - discount, 0);

  const handleOpenEnroll = (courseId: string) => {
    setSelectedCourseId(courseId);
    setEnrollMessage("");
    const formSection = document.getElementById("academy-enroll-online");
    formSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOnlineEnroll = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setEnrollMessage("Please fill name, email, and phone.");
      return;
    }

    if (!window.Razorpay) {
      setEnrollMessage("Payment gateway is loading. Please try again.");
      return;
    }
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      setEnrollMessage("Payment gateway key is missing. Please contact support.");
      return;
    }

    try {
      setProcessing(true);
      setEnrollMessage("");

      const orderRes = await fetch(`${BACKEND_URL}/api/academy-enrollments/razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          couponCode: discount > 0 ? coupon.trim() : undefined,
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        setEnrollMessage(orderData.message || "Unable to start payment.");
        setProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: "BLISS Academy",
        description: `Online enrollment for ${selectedCourse.title}`,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: { color: "#D4AF37" },
        handler: async (response: any) => {
          const verifyRes = await fetch(`${BACKEND_URL}/api/academy-enrollments/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseId: selectedCourse.id,
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim(),
              couponCode: discount > 0 ? coupon.trim() : undefined,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setEnrollMessage(
              `Enrollment successful. Your enrollment ID is ${verifyData.enrollment.enrollmentId}.`
            );
            setName("");
            setEmail("");
            setPhone("");
          } else {
            setEnrollMessage(verifyData.message || "Payment verification failed.");
          }
          setProcessing(false);
        },
        modal: {
          ondismiss: () => {
            setEnrollMessage("Payment cancelled. You can retry enrollment anytime.");
            setProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        setEnrollMessage(response.error?.description || "Payment failed. Please try again.");
        setProcessing(false);
      });
      razorpay.open();
    } catch (error) {
      console.error(error);
      setEnrollMessage("Unable to complete enrollment right now. Please try again.");
      setProcessing(false);
    }
  };

  const applyAcademyCoupon = async () => {
    if (!coupon.trim()) {
      setDiscount(0);
      setCouponMsg("Please enter a coupon code");
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/academy-enrollments/validate-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: coupon.trim(),
          courseId: selectedCourse.id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDiscount(data.discount || 0);
        setCouponMsg(`Coupon applied. You saved INR ${data.discount || 0}.`);
      } else {
        setDiscount(0);
        setCouponMsg(data.message || "Invalid coupon");
      }
    } catch (error) {
      console.error("Academy coupon validation error:", error);
      setDiscount(0);
      setCouponMsg("Error validating coupon");
    }
  };

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

        {/* Key highlights */}
        <section className="max-w-6xl mx-auto px-6 pb-12 md:pb-16">
          <div className="rounded-3xl border border-[#E8E2D9] bg-gradient-to-br from-white to-[#F6F1E8] p-6 md:p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B8860B] mb-2">
              Academy highlights
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2D2D2D] mb-6 md:mb-8">
              Learn with confidence at BLISS Academy
            </h2>

            <div className="grid gap-4 md:gap-5 sm:grid-cols-3">
            {academyHighlights.map((item) => (
              <div
                key={item}
                className="group rounded-2xl border border-[#E8E2D9] bg-white/95 px-5 py-5 md:px-6 md:py-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3.5 md:gap-4">
                  <div className="inline-flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B8860B] ring-1 ring-[#D4AF37]/25">
                    <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.2} />
                  </div>
                  <p className="text-base md:text-lg font-semibold leading-snug text-[#2D2D2D]">
                    {item}
                  </p>
                </div>
              </div>
            ))}
            </div>
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
                (() => {
                  const promo = getApplicableAcademyPromotion(course.title);
                  const offer = getApplicableAcademyOffer(course.title);
                  const autoPrice = getAutoDiscountedPrice(course);
                  return (
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
                  {(promo || offer) && (
                    <div className="mb-3 space-y-1">
                      {promo && (
                        <div className="space-y-1">
                          <p className="text-xs inline-block px-2 py-1 rounded bg-green-50 text-green-700">
                            {promo.title || "Academy Promotion"}
                          </p>
                          {promo.showCountdown && (
                            <span className="ml-2 inline-block align-middle">
                              <CountdownTimer endDate={promo.endDate} />
                            </span>
                          )}
                        </div>
                      )}
                      {offer && (
                        <p className="text-xs inline-block px-2 py-1 rounded bg-blue-50 text-blue-700 ml-2">
                          Offer Applied
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#D4AF37]" strokeWidth={2} />
                    {course.duration}
                  </p>
                  <p className="mb-3">
                    {autoPrice < course.fee && (
                      <span className="line-through text-gray-400 mr-2 text-sm">
                        INR {course.fee.toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-[#B8860B] font-semibold">
                      INR {autoPrice.toLocaleString("en-IN")}
                    </span>
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
                  <button
                    onClick={() => handleOpenEnroll(course.id)}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#c9a432] transition-colors"
                  >
                    Enroll online
                  </button>
                </motion.article>
                  );
                })()
              ))}
            </div>
          </div>
        </section>

        {/* Online enrollment (separate from service bookings) */}
        <section id="academy-enroll-online" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 rounded-3xl border border-[#E8E2D9] bg-white p-6 md:p-8 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B] mb-3">
                Online enrollment
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-3">Reserve your academy seat</h2>
              <p className="text-gray-600 mb-5">
                This enrollment checkout is dedicated to academy admissions and is separate from salon service bookings.
              </p>
              <div className="rounded-2xl border border-[#E8E2D9] bg-[#FCFBF9] p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Selected course</p>
                <h3 className="text-xl font-semibold">{selectedCourse.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedCourse.duration}</p>
                <p className="text-[#B8860B] text-lg font-semibold mt-2">
                  {selectedCourseAutoPrice < selectedCourse.fee && (
                    <span className="line-through text-gray-400 mr-2 text-base">
                      INR {selectedCourse.fee.toLocaleString("en-IN")}
                    </span>
                  )}
                  INR {selectedCourseAutoPrice.toLocaleString("en-IN")}
                </p>
                {selectedCourseAutoPrice < selectedCourse.fee && (
                  <p className="text-xs text-green-700 mt-1">Offer/Promotion auto-applied</p>
                )}
                {(getApplicableAcademyPromotion(selectedCourse.title) || getApplicableAcademyOffer(selectedCourse.title)) && (
                  <div className="mt-2 space-y-1">
                    {getApplicableAcademyPromotion(selectedCourse.title) && (
                      <div className="space-y-1">
                        <p className="text-xs text-green-700">
                          Promotion: {getApplicableAcademyPromotion(selectedCourse.title)?.title || "Academy Promotion"}
                        </p>
                        {getApplicableAcademyPromotion(selectedCourse.title)?.showCountdown && (
                          <CountdownTimer endDate={getApplicableAcademyPromotion(selectedCourse.title)?.endDate} />
                        )}
                      </div>
                    )}
                    {getApplicableAcademyOffer(selectedCourse.title) && (
                      <p className="text-xs text-blue-700">Special offer applied on this course</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-700">Choose course</span>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 outline-none focus:border-[#D4AF37]"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} - {course.level}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Full name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 outline-none focus:border-[#D4AF37]"
                  placeholder="Enter your name"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 outline-none focus:border-[#D4AF37]"
                  placeholder="Enter your email"
                  type="email"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Phone</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 outline-none focus:border-[#D4AF37]"
                  placeholder="Enter your phone number"
                />
              </label>

              <button
                onClick={handleOnlineEnroll}
                disabled={processing}
                className="w-full rounded-xl bg-[#D4AF37] py-3 text-white font-semibold hover:bg-[#c9a432] disabled:opacity-60 transition-colors"
              >
                {processing
                  ? "Processing payment..."
                  : `Pay INR ${finalPayable.toLocaleString("en-IN")} & Enroll`}
              </button>

              <div className="rounded-xl border border-stone-200 p-3">
                <label className="block text-sm text-gray-700 mb-1">Coupon code(if you have any valid coupon)</label>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    className="flex-1 rounded-lg border border-stone-300 px-3 py-2"
                    placeholder="Enter coupon"
                  />
                  <button
                    type="button"
                    onClick={applyAcademyCoupon}
                    className="rounded-lg bg-black text-white px-4 py-2 text-sm"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && <p className="text-xs mt-2 text-green-700">{couponMsg}</p>}
                {discount > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    Final payable: INR {finalPayable.toLocaleString("en-IN")}
                  </p>
                )}
              </div>

              {enrollMessage && (
                <p className="text-sm text-gray-700 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                  {enrollMessage}
                </p>
              )}
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
