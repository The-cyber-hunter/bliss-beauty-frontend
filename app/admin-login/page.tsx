"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AiFillLock } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Forgot password states
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3 | null>(null);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // ===== Login =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      router.replace("/admin");
    } catch (err) {
      setError("Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== Forgot Password Handlers =====
  const handleSendOtp = async () => {
    if (!forgotEmail) {
      setForgotMessage("Email is required");
      return;
    }
    setForgotMessage("Sending OTP...");
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/forgot-password/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        setForgotMessage(data.message);
        return;
      }
      setForgotMessage("OTP sent! Check your email.");
      setForgotStep(2);
    } catch (err) {
      console.error(err);
      setForgotMessage("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setForgotMessage("Please enter OTP");
      return;
    }
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/admin/forgot-password/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail, otp }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        setForgotMessage(data.message);
        return;
      }
      setForgotMessage("OTP verified! Enter new password.");
      setForgotStep(3);
    } catch (err) {
      console.error(err);
      setForgotMessage("Failed to verify OTP");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      setForgotMessage("Please enter new password");
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/forgot-password/reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: forgotEmail,
            otp,
            newPassword,
          }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        setForgotMessage(data.message);
        return;
      }
      setForgotMessage("Password reset successful! You can login now.");
      setForgotStep(null);
      setOtp("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setForgotMessage("Failed to reset password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4">
        {/* ===== Login Form ===== */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 flex items-center justify-center gap-2">
            <AiFillLock size={28} className="text-yellow-500" />
            Admin Login
          </h1>

          {error && (
            <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 mb-5 border-2 border-gray-300 rounded-xl bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition"
          />

          {/* ===== Password Field with Eye Icon ===== */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mb-2 border-2 border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition-all pr-12"
              required
            />
            {/* 👁️ Show/Hide only if user typed something */}
            {password && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-700 hover:text-yellow-500 transition cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </motion.button>
            )}
          </motion.div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white font-bold shadow-lg hover:shadow-2xl transition-all mb-2 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setForgotStep(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-2 text-yellow-600 font-medium underline hover:text-yellow-800 cursor-pointer transition"
          >
            Forgot Password?
          </motion.button>
        </motion.form>

        {/* ===== Forgot Password Modal ===== */}
        {forgotStep && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative cursor-pointer">
              <button
                onClick={() => setForgotStep(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold cursor-pointer transition"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
                Forgot Password
              </h2>

              {forgotMessage && (
                <p className="text-center mb-4 text-red-600 font-medium">
                  {forgotMessage}
                </p>
              )}

              {forgotStep === 1 && (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition"
                  />
                  <button
                    onClick={handleSendOtp}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white font-bold shadow hover:shadow-2xl transition-all cursor-pointer"
                  >
                    Send OTP
                  </button>
                </>
              )}

              {forgotStep === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white font-bold shadow hover:shadow-2xl transition-all cursor-pointer"
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {forgotStep === 3 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 mb-2 border-2 border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition-all pr-12"
                    required
                  />
                  {/* 👁️ Show/Hide only if user typed something */}
                  {newPassword && (
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-700 hover:text-yellow-500 transition cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}