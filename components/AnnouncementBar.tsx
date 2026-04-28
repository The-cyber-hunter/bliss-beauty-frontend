"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Promotion = {
  _id: string;
  title?: string;
  serviceName?: string | null;
  discountType: "percentage" | "amount";
  discountValue: number;
  startDate: string;
  endDate: string;
  showCountdown?: boolean;
};

type PromoSlide = {
  key: string;
  message: string;
  cta: { href: string; label: string };
};

function formatPromotion(p: Promotion, serviceType: string) {
  const discount =
    p.discountType === "percentage" ? `${p.discountValue}% off` : `₹${p.discountValue} off`;
  const title = (p.title || "").trim();
  const service = (p.serviceName || "").trim();
  const serviceLabel = service || `${serviceType} services`;

  if (title) return `${title} — ${discount} on ${serviceLabel}`;
  return `${discount} on ${serviceLabel}`;
}

export default function AnnouncementBar(props: {
  storageKey?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const {
    storageKey = "bliss.announcementBar.v1",
    ctaLabel = "Book now",
    ctaHref = "/services",
  } = props;

  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<PromoSlide[]>([]);
  const [index, setIndex] = useState(0);

  const active = slides[index];
  const message = active?.message || "";
  const resolvedCta = active?.cta || { href: ctaHref, label: ctaLabel };
  const visibleDots = useMemo(() => slides.slice(0, 6), [slides]);

  useEffect(() => {
    let cancelled = false;

    const shouldShow = () => {
      try {
        return window.localStorage.getItem(storageKey) !== "hidden";
      } catch {
        return true;
      }
    };

    const run = async () => {
      if (!shouldShow()) return;

      const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      try {
        const [servicesRes, academyRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/bookings/active-promotions`, { cache: "no-store" }),
          fetch(`${BACKEND_URL}/api/academy-enrollments/active-promotions`, { cache: "no-store" }),
        ]);

        const [servicesData, academyData] = await Promise.all([
          servicesRes.json(),
          academyRes.json(),
        ]);

        const nextSlides: { slide: PromoSlide; endAt: number }[] = [];

        if (servicesRes.ok && servicesData?.success) {
          const byType: Record<string, Promotion[]> = servicesData.promotions || {};
          Object.entries(byType).forEach(([serviceType, promos]) => {
            (promos || []).forEach((promo: Promotion) => {
              nextSlides.push({
                slide: {
                  key: `svc:${serviceType}:${promo._id}`,
                  message: "Offer live: " + formatPromotion(promo, serviceType),
                  cta: { href: `/services?tab=${encodeURIComponent(serviceType)}`, label: ctaLabel },
                },
                endAt: new Date(promo.endDate).getTime(),
              });
            });
          });
        }

        if (academyRes.ok && academyData?.success) {
          const promos: Promotion[] = academyData.promotions || [];
          promos.forEach((promo) => {
            nextSlides.push({
              slide: {
                key: `acad:academy:${promo._id}`,
                message: "Academy offer live: " + formatPromotion(promo, "academy"),
                cta: { href: "/academy", label: "Join academy" },
              },
              endAt: new Date(promo.endDate).getTime(),
            });
          });
        }

        if (nextSlides.length === 0) {
          // No running promotions -> don't show bar.
          if (!cancelled) setOpen(false);
          return;
        }

        if (!cancelled) {
          nextSlides.sort((a, b) => a.endAt - b.endAt);
          setSlides(nextSlides.map((x) => x.slide));
          setIndex(0);
          setOpen(true);
        }
      } catch {
        // If API fails, don't distract users with a generic bar.
        if (!cancelled) setOpen(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    if (!open) return;
    if (slides.length <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(t);
  }, [open, slides.length]);

  const close = () => {
    try {
      window.localStorage.setItem(storageKey, "hidden");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && slides.length > 0 && message && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full bg-[#0f0f0f] text-white"
        >
          <div className="relative overflow-hidden">
            {/* Premium glow + subtle pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.22),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
              <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 ring-1 ring-white/10">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_0_4px_rgba(212,175,55,0.18)]" />
                  Offers
                </span>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={active?.key || "msg"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs sm:text-sm text-white/90 truncate"
                  >
                    <span className="font-semibold text-white">Live:</span> {message}
                  </motion.p>
                </AnimatePresence>
                <Link
                  href={resolvedCta.href}
                  className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-[#D4AF37] to-yellow-500 px-3 py-1 text-xs font-bold text-[#1A1A1A] shadow-sm ring-1 ring-black/10 hover:opacity-95 transition"
                >
                  {resolvedCta.label} →
                </Link>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {slides.length > 1 && (
                  <div className="hidden sm:flex items-center gap-1.5 pr-3 mr-1 border-r border-white/10">
                    <div className="flex items-center gap-1">
                      {visibleDots.map((s, i) => {
                        const isActive = slides[index]?.key === s.key;
                        return (
                          <button
                            key={s.key}
                            type="button"
                            onClick={() => setIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              isActive ? "w-6 bg-[#D4AF37]" : "w-2 bg-white/20 hover:bg-white/30"
                            }`}
                            aria-label={`Go to announcement ${i + 1}`}
                          />
                        );
                      })}
                      {slides.length > visibleDots.length && (
                        <span className="text-[10px] text-white/60 ml-1">
                          +{slides.length - visibleDots.length}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <Link
                  href={resolvedCta.href}
                  className="sm:hidden inline-flex items-center rounded-full bg-gradient-to-r from-[#D4AF37] to-yellow-500 px-3 py-1 text-xs font-bold text-[#1A1A1A] shadow-sm ring-1 ring-black/10 hover:opacity-95 transition"
                >
                  {resolvedCta.label} →
                </Link>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Dismiss announcement"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition ml-1"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

