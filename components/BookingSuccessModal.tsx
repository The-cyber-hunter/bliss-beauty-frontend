"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BookingSuccessModalProps {
    bookingId: string;
    finalAmount: number;
    variant: "cod" | "online";
    onClose: () => void;
}

export default function BookingSuccessModal({
    bookingId,
    finalAmount,
    variant,
    onClose,
}: BookingSuccessModalProps) {
    const title = variant === "cod" ? "Booking confirmed" : "Payment successful";

    return (
        <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            onClick={onClose}
        >
            <motion.div
                className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl text-center"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl ring-4 ring-emerald-100/80">
                    ✓
                </div>
                <h2 id="booking-success-title" className="text-2xl font-semibold text-[#2D2D2D] mb-2">
                    {title}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    {variant === "cod"
                        ? "Your appointment is booked. Pay when the service is delivered."
                        : "Your payment was received and your booking is confirmed."}
                </p>

                <div className="rounded-xl bg-[#F9F8F7] border border-[#2D2D2D]/8 px-4 py-3 mb-4 text-left">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Booking ID</p>
                    <p className="font-mono text-sm font-medium text-[#2D2D2D] break-all">{bookingId}</p>
                </div>

                <p className="text-lg font-semibold text-[#D4AF37] mb-6">
                    {variant === "cod" ? (
                        <>Pay ₹{finalAmount} at the time of service</>
                    ) : (
                        <>Paid ₹{finalAmount}</>
                    )}
                </p>

                <p className="text-sm text-gray-600 mb-6">
                    A receipt and confirmation have been sent to your email.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href={`/track-booking?id=${encodeURIComponent(bookingId)}`}
                        onClick={onClose}
                        className="w-full py-3 rounded-xl font-semibold text-center bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md hover:opacity-95 transition-opacity"
                    >
                        Track booking
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-3 rounded-xl font-medium text-[#2D2D2D] border border-[#2D2D2D]/15 hover:bg-gray-50 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
