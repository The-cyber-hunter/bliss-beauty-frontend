"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type DiscountType = "percentage" | "amount";

type ServiceOffer = {
  _id?: string;
  serviceName: string;
  discountType: DiscountType;
  discountValue: number;
  priority?: number;
};

type Promotion = {
  _id: string;
  title?: string;
  serviceName?: string | null;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  showCountdown?: boolean;
  serviceType?: string;
};

function formatDiscount(discountType: DiscountType, discountValue: number) {
  return discountType === "percentage" ? `${discountValue}% off` : `₹${discountValue} off`;
}

function formatDateRange(start: string, end: string) {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const fmt = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" });
    return `${fmt.format(s)} – ${fmt.format(e)}`;
  } catch {
    return "";
  }
}

export default function HomeOffers() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(true);
  const [servicePromos, setServicePromos] = useState<Record<string, Promotion[]>>({});
  const [serviceOffers, setServiceOffers] = useState<ServiceOffer[]>([]);
  const [academyPromos, setAcademyPromos] = useState<Promotion[]>([]);
  const [academyOffers, setAcademyOffers] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        setLoading(true);
        const [servicePromosRes, serviceOffersRes, academyPromosRes, academyOffersRes] =
          await Promise.all([
            fetch(`${BACKEND_URL}/api/bookings/active-promotions`, { cache: "no-store" }),
            fetch(`${BACKEND_URL}/api/bookings/active-offers`, { cache: "no-store" }),
            fetch(`${BACKEND_URL}/api/academy-enrollments/active-promotions`, { cache: "no-store" }),
            fetch(`${BACKEND_URL}/api/academy-enrollments/active-offers`, { cache: "no-store" }),
          ]);

        const [servicePromosData, serviceOffersData, academyPromosData, academyOffersData] =
          await Promise.all([
            servicePromosRes.json(),
            serviceOffersRes.json(),
            academyPromosRes.json(),
            academyOffersRes.json(),
          ]);

        if (!cancelled) {
          setServicePromos(servicePromosData?.success ? servicePromosData.promotions || {} : {});
          setServiceOffers(serviceOffersData?.success ? serviceOffersData.offers || [] : []);
          setAcademyPromos(academyPromosData?.success ? academyPromosData.promotions || [] : []);
          setAcademyOffers(academyOffersData?.success ? academyOffersData.offers || [] : []);
        }
      } catch {
        if (!cancelled) {
          setServicePromos({});
          setServiceOffers([]);
          setAcademyPromos([]);
          setAcademyOffers([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [BACKEND_URL]);

  const servicePromoCards = useMemo(() => {
    const entries = Object.entries(servicePromos || {});
    return entries.flatMap(([serviceType, promos]) =>
      (promos || []).map((p) => ({
        key: `${serviceType}:${p._id}`,
        scope: "Service promotion",
        title: p.title || "Limited time promotion",
        subtitle: `${formatDiscount(p.discountType, p.discountValue)} • ${
          (p.serviceName || "").trim() || `${serviceType} services`
        }`,
        meta: formatDateRange(p.startDate, p.endDate),
        href: "/services",
        cta: "Book now",
        tone: "gold" as const,
      }))
    );
  }, [servicePromos]);

  const serviceOfferCards = useMemo(() => {
    return (serviceOffers || []).map((o, idx) => ({
      key: `${o._id || idx}`,
      scope: "Service offer",
      title: o.serviceName,
      subtitle: formatDiscount(o.discountType, o.discountValue),
      meta: "Limited offer",
      href: "/services",
      cta: "View services",
      tone: "light" as const,
    }));
  }, [serviceOffers]);

  const academyPromoCards = useMemo(() => {
    return (academyPromos || []).map((p) => ({
      key: p._id,
      scope: "Academy promotion",
      title: p.title || "Academy promotion",
      subtitle: `${formatDiscount(p.discountType, p.discountValue)} • ${
        (p.serviceName || "").trim() || "Academy courses"
      }`,
      meta: formatDateRange(p.startDate, p.endDate),
      href: "/academy",
      cta: "Enroll online",
      tone: "gold" as const,
    }));
  }, [academyPromos]);

  const academyOfferCards = useMemo(() => {
    return (academyOffers || []).map((o: any, idx: number) => ({
      key: `${o._id || idx}`,
      scope: "Academy offer",
      title: o.serviceName || "Academy course",
      subtitle: formatDiscount(o.discountType, o.discountValue),
      meta: "Offer on course fee",
      href: "/academy",
      cta: "Join academy",
      tone: "light" as const,
    }));
  }, [academyOffers]);

  const cards = useMemo(() => {
    return [
      ...servicePromoCards,
      ...serviceOfferCards,
      ...academyPromoCards,
      ...academyOfferCards,
    ];
  }, [servicePromoCards, serviceOfferCards, academyPromoCards, academyOfferCards]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="rounded-3xl border border-[#E8E2D9] bg-white p-6">
          <p className="text-sm text-gray-600">Loading offers…</p>
        </div>
      </section>
    );
  }

  if (cards.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B8860B] mb-2">
            Running offers
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2D2D2D]">
            Deals live right now
          </h2>
          <p className="text-gray-600 mt-2">
            Salon services and academy courses — updated automatically from the backend.
          </p>
        </div>
        <div className="hidden sm:flex gap-3">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c9a432] transition-colors"
          >
            Book services
          </Link>
          <Link
            href="/academy"
            className="inline-flex items-center justify-center rounded-xl border border-[#2D2D2D]/15 px-5 py-3 text-sm font-semibold text-[#2D2D2D] hover:bg-white transition-colors"
          >
            Join academy
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className={`relative overflow-hidden rounded-3xl border shadow-sm ${
              c.tone === "gold"
                ? "border-[#D4AF37]/25 bg-gradient-to-br from-[#FFF3C2] via-white to-white"
                : "border-[#E8E2D9] bg-white"
            }`}
          >
            {c.tone === "gold" && (
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#D4AF37]/20 blur-2xl" />
            )}

            <div className="relative p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                {c.scope}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[#1F1F1F]">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{c.subtitle}</p>
              {c.meta && <p className="mt-2 text-xs text-gray-500">{c.meta}</p>}

              <div className="mt-5 flex items-center justify-between gap-3">
                <Link
                  href={c.href}
                  className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    c.tone === "gold"
                      ? "bg-[#2D2D2D] text-white hover:opacity-95"
                      : "bg-[#D4AF37] text-white hover:bg-[#c9a432]"
                  }`}
                >
                  {c.cta} →
                </Link>
                <span className="text-xs text-gray-500">Updated live</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

