"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type LaunchModalVariant = "offer" | "announcement";

type DiscountType = "percentage" | "amount";

type Promotion = {
  _id: string;
  title?: string;
  serviceName?: string | null;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  showCountdown?: boolean;
};

type Offer = {
  _id?: string;
  serviceName: string;
  discountType: DiscountType;
  discountValue: number;
  priority?: number;
};

type DealCard = {
  key: string;
  scope: "Services" | "Academy";
  title: string;
  subtitle: string;
  meta?: string;
  href: string;
  cta: string;
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
    return undefined;
  }
}

export default function LaunchModal(props: {
  variant?: LaunchModalVariant;
}) {
  const { variant = "offer" } = props;

  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const [deals, setDeals] = useState<DealCard[]>([]);
  const [dealIndex, setDealIndex] = useState(0);
  const [dealsLoading, setDealsLoading] = useState(false);
  const [dealsError, setDealsError] = useState<string>("");

  const content = useMemo(() => {
    if (variant === "announcement") {
      return {
        eyebrow: "BLISS Updates",
        title: "Welcome to BLISS",
        description:
          "Premium salon services at home and in-salon. Explore our services and book your appointment in minutes.",
        bookCta: { label: "Book at home", href: "/services?mode=home" as const },
        visitCta: { label: "Book salon visit", href: "/services?mode=salon" as const },
      };
    }

    return {
      eyebrow: "Welcome",
      title: "Luxury beauty, booked in minutes",
      description:
        "Explore today’s live offers, then book at home or schedule a salon visit in just a few steps.",
      bookCta: { label: "Book home visit", href: "/services?mode=home" as const },
      visitCta: { label: "Book salon visit", href: "/services?mode=salon" as const },
    };
  }, [variant]);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 450);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    const run = async () => {
      try {
        if (!cancelled) setDealsLoading(true);
        if (!cancelled) setDealsError("");
        const [servicePromosRes, serviceOffersRes, academyPromosRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/bookings/active-promotions`, { cache: "no-store" }),
          fetch(`${BACKEND_URL}/api/bookings/active-offers`, { cache: "no-store" }),
          fetch(`${BACKEND_URL}/api/academy-enrollments/active-promotions`, { cache: "no-store" }),
        ]);

        const [servicePromosData, serviceOffersData, academyPromosData] = await Promise.all([
          servicePromosRes.json(),
          serviceOffersRes.json(),
          academyPromosRes.json(),
        ]);

        const nextDeals: DealCard[] = [];

        if (servicePromosRes.ok && servicePromosData?.success) {
          const byType: Record<string, Promotion[]> = servicePromosData.promotions || {};
          Object.entries(byType).forEach(([serviceType, promos]) => {
            (promos || []).forEach((p) => {
              nextDeals.push({
                key: `svc-promo:${serviceType}:${p._id}`,
                scope: "Services",
                title: p.title || "Limited time promotion",
                subtitle: `${formatDiscount(p.discountType, p.discountValue)} on ${
                  (p.serviceName || "").trim() || `${serviceType} services`
                }`,
                meta: formatDateRange(p.startDate, p.endDate),
                href: `/services?tab=${encodeURIComponent(serviceType)}`,
                cta: "Book now",
              });
            });
          });
        }

        if (serviceOffersRes.ok && serviceOffersData?.success) {
          const offers: Offer[] = serviceOffersData.offers || [];
          offers.forEach((o, idx) => {
            nextDeals.push({
              key: `svc-offer:${o._id || idx}`,
              scope: "Services",
              title: o.serviceName,
              subtitle: formatDiscount(o.discountType, o.discountValue),
              meta: "Special offer",
              href: "/services",
              cta: "View services",
            });
          });
        }

        if (academyPromosRes.ok && academyPromosData?.success) {
          const promos: Promotion[] = academyPromosData.promotions || [];
          promos.forEach((p) => {
            nextDeals.push({
              key: `acad-promo:${p._id}`,
              scope: "Academy",
              title: p.title || "Academy promotion",
              subtitle: `${formatDiscount(p.discountType, p.discountValue)} on ${
                (p.serviceName || "").trim() || "Academy courses"
              }`,
              meta: formatDateRange(p.startDate, p.endDate),
              href: "/academy",
              cta: "Enroll online",
            });
          });
        }

        if (!cancelled) {
          setDeals(nextDeals);
          setDealIndex(0);
        }
      } catch {
        if (!cancelled) {
          setDeals([]);
          setDealsError("Unable to load offers right now.");
        }
      } finally {
        if (!cancelled) setDealsLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (deals.length <= 1) return;
    const t = window.setInterval(() => {
      setDealIndex((i) => (i + 1) % deals.length);
    }, 4200);
    return () => window.clearInterval(t);
  }, [open, deals.length]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  if (!open) return null;

  const activeDeal = deals[dealIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={close}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/50" />
      <motion.div
        className="relative w-full max-w-[92vw] sm:max-w-2xl overflow-hidden rounded-2xl sm:rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/10 max-h-[88vh] overflow-y-auto sm:max-h-none sm:overflow-y-visible"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
      >
        {/* Premium top glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[420px] -translate-x-1/2 -translate-y-0 rounded-full bg-[#D4AF37]/25 blur-3xl z-0 sm:-top-24 sm:h-48 sm:w-[520px]" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            close();
          }}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 text-[#2D2D2D] shadow-sm ring-1 ring-black/10 backdrop-blur hover:bg-white"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        <div className="relative z-10">
          {/* Header */}
          <div className="px-4 pt-5 sm:px-9 sm:pt-9">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF7DB] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A6B00] ring-1 ring-[#D4AF37]/25">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {content.eyebrow}
            </div>

            <h2
              id={titleId}
              className="mt-3 text-[22px] sm:text-[34px] leading-[1.12] font-semibold text-[#1F1F1F]"
            >
              {content.title}
            </h2>
            <p id={descriptionId} className="mt-2.5 text-[13px] sm:text-[16px] text-gray-600 leading-relaxed max-w-xl">
              {content.description}
            </p>
          </div>

          {/* Deals slider */}
          {dealsLoading && (
            <div className="px-4 mt-4 sm:px-9 sm:mt-6">
              <div className="rounded-2xl sm:rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#FFF3C2] via-white to-white p-4 sm:p-5 shadow-sm">
                <p className="text-sm text-gray-700">Loading offers…</p>
              </div>
            </div>
          )}

          {!dealsLoading && activeDeal && (
            <div className="px-4 mt-4 sm:px-9 sm:mt-6">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#FFF3C2] via-white to-white p-4 sm:p-5 shadow-sm">
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#D4AF37]/20 blur-3xl" />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A6B00]">
                      {activeDeal.scope} offer
                    </p>
                    <h3 className="mt-2 text-lg sm:text-xl font-semibold text-[#1F1F1F] truncate">
                      {activeDeal.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-700">{activeDeal.subtitle}</p>
                    {activeDeal.meta && <p className="mt-2 text-xs text-gray-500">{activeDeal.meta}</p>}
                  </div>

                  <Link
                    href={activeDeal.href}
                    onClick={close}
                    className="shrink-0 inline-flex items-center justify-center rounded-xl bg-[#2D2D2D] px-3.5 py-2 text-sm font-semibold text-white hover:opacity-95 transition-opacity"
                  >
                    {activeDeal.cta} →
                  </Link>
                </div>

                {deals.length > 1 && (
                  <div className="relative mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      {deals.slice(0, 8).map((d, i) => (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => setDealIndex(i)}
                          aria-label={`Go to offer ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            i === dealIndex ? "w-6 bg-[#D4AF37]" : "w-2 bg-black/15 hover:bg-black/25"
                          }`}
                        />
                      ))}
                      {deals.length > 8 && (
                        <span className="text-[11px] text-gray-500 ml-1">+{deals.length - 8}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDealIndex((i) => (i - 1 + deals.length) % deals.length)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-extrabold ring-1 ring-black/10 shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="Previous offer"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => setDealIndex((i) => (i + 1) % deals.length)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-extrabold ring-1 ring-black/10 shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="Next offer"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!dealsLoading && !activeDeal && (
            <div className="px-4 mt-4 sm:px-9 sm:mt-6">
              <div className="rounded-2xl sm:rounded-3xl border border-[#2D2D2D]/10 bg-white p-4 sm:p-5 shadow-sm">
                <p className="text-sm font-semibold text-[#1F1F1F]">Offers</p>
                <p className="mt-1 text-sm text-gray-600">
                  {dealsError ? dealsError : "No live offers at the moment."}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-xl border border-[#2D2D2D]/10 bg-white px-4 py-2 text-sm font-semibold text-[#2D2D2D] hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Choices */}
          <div className="px-4 mt-4 sm:px-9 sm:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={content.bookCta.href}
                onClick={close}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FFF3C2] via-white to-white p-4 sm:p-5 ring-1 ring-[#D4AF37]/30 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/25 blur-2xl transition-opacity duration-200 opacity-70 group-hover:opacity-100" />
                <div className="relative flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37] text-white shadow-sm ring-1 ring-black/5">
                    <span className="text-lg leading-none">🏠</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-[#1F1F1F]">{content.bookCta.label}</p>
                    <p className="mt-1 text-sm text-gray-600">Choose service • Pick date • Confirm</p>
                  </div>
                </div>
                <div className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8A6B00]">
                  Continue
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </div>
              </Link>

              <Link
                href={content.visitCta.href}
                onClick={close}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 ring-1 ring-[#2D2D2D]/10 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-black/10 blur-2xl transition-opacity duration-200 opacity-40 group-hover:opacity-60" />
                <div className="relative flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2D2D2D] text-white shadow-sm ring-1 ring-black/5">
                    <span className="text-lg leading-none">✨</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-[#1F1F1F]">{content.visitCta.label}</p>
                    <p className="mt-1 text-sm text-gray-600">Pick service • Select date • Choose slot</p>
                  </div>
                </div>
                <div className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2D2D2D]">
                  View slots
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 pb-5 sm:px-9 sm:pb-9 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="sm:ml-auto" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

