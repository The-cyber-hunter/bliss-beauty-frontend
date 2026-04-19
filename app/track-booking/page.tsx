"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Sparkles,
  ClipboardList,
  Check,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

const FLOW = ["pending", "confirmed", "completed"] as const;

const STATUS_COPY: Record<
  string,
  { title: string; description: string }
> = {
  pending: {
    title: "Pending",
    description:
      "We have received your booking. Complete payment or wait for confirmation.",
  },
  confirmed: {
    title: "Confirmed",
    description:
      "Your appointment is locked in. We will see you on the scheduled date.",
  },
  completed: {
    title: "Completed",
    description: "This booking has been marked complete. Thank you for choosing Bliss.",
  },
  cancelled: {
    title: "Cancelled",
    description: "This booking is no longer active.",
  },
};

const STEP_HINT: Record<(typeof FLOW)[number], string> = {
  pending: "Awaiting confirmation or payment",
  confirmed: "Your slot is reserved",
  completed: "Visit completed",
};

function normalizeStatus(raw: string) {
  return raw.trim().toLowerCase().replace(/\s+/g, "_");
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function TrackBooking() {
  const [bookingId, setBookingId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill ID from email link: /track-booking?id=BLISS-...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("id") || params.get("bookingId");
    if (fromUrl?.trim()) setBookingId(fromUrl.trim());
  }, []);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus(null);
    setLoading(true);
    try {
      const id = bookingId.trim();
      const res = await fetch(
        `${BACKEND_URL}/api/bookings/track?id=${encodeURIComponent(id)}`
      );
      const data = await res.json();
      if (data.success) {
        setStatus(data.status);
      } else {
        setError(data.message || "Booking not found");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const normalized = status ? normalizeStatus(status) : null;
  const meta = normalized ? STATUS_COPY[normalized] ?? {
    title: status ?? "Status",
    description: "Here is the latest update for your booking.",
  } : null;

  const flowIndex =
    normalized && FLOW.includes(normalized as (typeof FLOW)[number])
      ? FLOW.indexOf(normalized as (typeof FLOW)[number])
      : -1;

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F9F8F7] text-[#2D2D2D]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#D4AF37]/[0.08] blur-3xl" />
        <div className="absolute -left-20 bottom-24 h-72 w-72 rounded-full bg-stone-300/25 blur-3xl" />
      </div>

      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B]">
                Booking status
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                Track your
                <span className="block bg-gradient-to-r from-[#B8860B] to-[#D4AF37] bg-clip-text text-transparent">
                  appointment
                </span>
              </h1>
              <p className="max-w-md text-lg text-gray-600">
                Enter the booking ID from your confirmation email or receipt to
                see where your visit stands in our schedule.
              </p>

              <ul className="max-w-md space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-stone-200/80">
                    <ClipboardList className="h-4 w-4 text-[#B8860B]" />
                  </span>
                  <span>
                    <span className="font-medium text-[#2D2D2D]">
                      Same ID as checkout
                    </span>
                    — use the code shown after you book on the services page.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-stone-200/80">
                    <Sparkles className="h-4 w-4 text-[#B8860B]" />
                  </span>
                  <span>
                    Status updates when payment clears and when we confirm your
                    slot.
                  </span>
                </li>
              </ul>

              <p className="text-sm text-gray-500">
                Need a new visit?{" "}
                <Link
                  href="/services"
                  className="font-semibold text-[#B8860B] underline decoration-[#D4AF37]/40 underline-offset-4 hover:text-[#9A7209]"
                >
                  Browse services
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-3xl border border-stone-200/90 bg-white/90 shadow-xl shadow-stone-200/60 backdrop-blur-sm"
            >
              <div className="border-b border-stone-100 bg-gradient-to-br from-[#FFFBF0] to-white px-8 py-7 md:px-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] ring-1 ring-[#D4AF37]/25">
                    <CalendarClock className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#2D2D2D]">
                      Look up booking
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Paste or type your ID exactly as it appears.
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleTrack}
                className="space-y-5 px-8 py-8 md:px-10 md:py-9"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="booking-id"
                    className="text-sm font-semibold text-[#2D2D2D]"
                  >
                    Booking ID
                  </label>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                      strokeWidth={2}
                    />
                    <input
                      id="booking-id"
                      type="text"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-base font-medium text-[#2D2D2D] shadow-inner shadow-stone-100 outline-none transition focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/25"
                      placeholder="e.g. BLISS-XXXXX"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3.5 text-base font-semibold text-white shadow-md shadow-[#D4AF37]/25 transition hover:bg-[#c9a432] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Checking…
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" strokeWidth={2.25} />
                      Track booking
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence mode="wait">
                {normalized && meta && (
                  <motion.div
                    key="result"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden border-t border-stone-100"
                  >
                    <div className="space-y-6 px-8 pb-8 pt-2 md:px-10 md:pb-10">
                      {normalized === "cancelled" ? (
                        <div className="flex gap-4 rounded-2xl border border-red-100 bg-red-50/90 p-5 text-red-900">
                          <XCircle
                            className="mt-0.5 h-6 w-6 shrink-0 text-red-600"
                            strokeWidth={2}
                          />
                          <div>
                            <p className="font-semibold">{meta.title}</p>
                            <p className="mt-1 text-sm text-red-800/90">
                              {meta.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div
                            className={`flex gap-4 rounded-2xl border p-5 ${
                              flowIndex >= 2
                                ? "border-emerald-100 bg-emerald-50/90 text-emerald-900"
                                : flowIndex === 1
                                  ? "border-amber-100 bg-amber-50/90 text-amber-950"
                                  : flowIndex === 0
                                    ? "border-sky-100 bg-sky-50/90 text-sky-950"
                                    : "border-stone-200 bg-stone-50/90 text-stone-900"
                            }`}
                          >
                            <CheckCircle2
                              className={`mt-0.5 h-6 w-6 shrink-0 ${
                                flowIndex >= 2
                                  ? "text-emerald-600"
                                  : flowIndex === 1
                                    ? "text-amber-600"
                                    : flowIndex === 0
                                      ? "text-sky-600"
                                      : "text-stone-600"
                              }`}
                              strokeWidth={2}
                            />
                            <div>
                              <p className="font-semibold">{meta.title}</p>
                              <p className="mt-1 text-sm opacity-90">
                                {meta.description}
                              </p>
                            </div>
                          </div>

                          {flowIndex >= 0 && (
                            <div>
                              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Progress
                              </p>
                              <ol className="space-y-0">
                                {FLOW.map((step, i) => {
                                  const done = flowIndex > i;
                                  const current = flowIndex === i;
                                  const label =
                                    STATUS_COPY[step]?.title ??
                                    step.charAt(0).toUpperCase() + step.slice(1);
                                  return (
                                    <li
                                      key={step}
                                      className="relative flex gap-3 pb-6 last:pb-0"
                                    >
                                      {i < FLOW.length - 1 && (
                                        <span
                                          className={`absolute left-[15px] top-8 bottom-0 w-px ${
                                            done
                                              ? "bg-[#D4AF37]/50"
                                              : "bg-stone-200"
                                          }`}
                                          aria-hidden
                                        />
                                      )}
                                      <span
                                        className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                          done
                                            ? "bg-[#D4AF37] text-white"
                                            : current
                                              ? "bg-[#FFFBF0] text-[#B8860B] ring-2 ring-[#D4AF37]/50"
                                              : "bg-stone-100 text-gray-400"
                                        }`}
                                      >
                                        {done ? (
                                          <Check className="h-4 w-4" strokeWidth={3} />
                                        ) : (
                                          i + 1
                                        )}
                                      </span>
                                      <div className="min-w-0 pt-0.5">
                                        <p
                                          className={`font-medium ${
                                            current || done
                                              ? "text-[#2D2D2D]"
                                              : "text-gray-400"
                                          }`}
                                        >
                                          {label}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {STEP_HINT[step]}
                                        </p>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ol>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden border-t border-stone-100"
                  >
                    <div className="px-8 pb-8 pt-2 md:px-10 md:pb-10">
                      <div className="flex gap-4 rounded-2xl border border-red-100 bg-red-50/90 p-5 text-red-900">
                        <XCircle
                          className="mt-0.5 h-6 w-6 shrink-0 text-red-600"
                          strokeWidth={2}
                        />
                        <div>
                          <p className="font-semibold">Could not find booking</p>
                          <p className="mt-1 text-sm text-red-800/90">{error}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
