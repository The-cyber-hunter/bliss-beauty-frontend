"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface PaymentModalProps {
    amount: number;
    onSelectMethod: (method: "online" | "cod") => void;
    onClose: () => void;
    loading: boolean;
}

export default function PaymentModal({ amount, onSelectMethod, onClose, loading }: PaymentModalProps) {
    const [selected, setSelected] = useState<"online" | "cod" | null>(null);

    return (
        <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <h2 className="text-xl font-bold text-center mb-1">Choose Payment Method</h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Total: <span className="text-[#D4AF37] font-bold text-lg">₹{amount}</span>
                </p>

                {/* Payment Options */}
                <div className="space-y-3 mb-6">
                    {/* Pay Online */}
                    <button
                        onClick={() => setSelected("online")}
                        disabled={loading}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${selected === "online"
                            ? "border-[#D4AF37] bg-[#fffaf0] shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${selected === "online" ? "bg-[#D4AF37] text-white" : "bg-gray-100"
                            }`}>
                            💳
                        </div>
                        <div className="text-left flex-1">
                            <p className="font-semibold text-[#2D2D2D]">Pay Online</p>
                            <p className="text-xs text-gray-500">UPI, Cards, Net Banking, Wallets</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === "online" ? "border-[#D4AF37]" : "border-gray-300"
                            }`}>
                            {selected === "online" && (
                                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                            )}
                        </div>
                    </button>

                    {/* Cash on Delivery */}
                    <button
                        onClick={() => setSelected("cod")}
                        disabled={loading}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${selected === "cod"
                            ? "border-[#D4AF37] bg-[#fffaf0] shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${selected === "cod" ? "bg-[#D4AF37] text-white" : "bg-gray-100"
                            }`}>
                            💵
                        </div>
                        <div className="text-left flex-1">
                            <p className="font-semibold text-[#2D2D2D]">Cash on Delivery</p>
                            <p className="text-xs text-gray-500">Pay when service is delivered</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === "cod" ? "border-[#D4AF37]" : "border-gray-300"
                            }`}>
                            {selected === "cod" && (
                                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                            )}
                        </div>
                    </button>
                </div>

                {/* Proceed Button */}
                <button
                    onClick={() => selected && onSelectMethod(selected)}
                    disabled={!selected || loading}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all ${!selected || loading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#D4AF37] to-yellow-500 hover:scale-[1.02] cursor-pointer shadow-md"
                        }`}
                >
                    {loading
                        ? "Processing..."
                        : selected === "online"
                            ? `Pay ₹${amount} Now`
                            : selected === "cod"
                                ? "Confirm Booking"
                                : "Select a payment method"}
                </button>

                {/* Close */}
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="mt-3 text-sm text-gray-500 cursor-pointer py-2 rounded-lg border w-full hover:bg-gray-50 disabled:opacity-50"
                >
                    Go Back
                </button>
            </motion.div>
        </motion.div>
    );
}
