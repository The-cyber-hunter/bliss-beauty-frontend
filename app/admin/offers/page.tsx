"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Coupon {
  _id?: string;
  code: string;
  service?: string;
  discountType?: "percentage" | "amount";
  discountValue?: number;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  usedCount?: number;
}

export default function CouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [code, setCode] = useState("");
  const [service, setService] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "amount">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [discountWarning, setDiscountWarning] = useState("");
  const [now, setNow] = useState(Date.now());

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const API = `${BASE_URL}/api`;

  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin-login");
      throw new Error("No token");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };


  // ========================== FETCH COUPONS ==========================
  const fetchCoupons = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return router.push("/admin-login");

    try {
      setLoading(true);

      const res = await fetch(`${API}/admin/coupons`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch coupons");

      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Failed to fetch");

      setCoupons(data.coupons || []);
    } catch (err: any) {
      console.error("Fetch coupons error:", err);
      setError(err.message || "Error fetching coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []); // keep same but ensure function is stable (ok for now)

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeRemaining = (end?: string) => {
    if (!end) return "-";
    const total = new Date(end).getTime() - now;
    if (total <= 0) return "Expired";
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // ========================== SAVE COUPON ==========================
  const handleSaveCoupon = async () => {
    if (!code) return alert("Coupon code is required");

    if (discountValue <= 0) {
      return alert("Discount must be greater than 0");
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return alert("End date cannot be before start date");
    }


    const payload = {
      code: code.toUpperCase(),
      service: service || undefined,
      discountType,
      discountValue,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDate ? new Date(endDate).toISOString() : undefined,
      enabled,
    };

    try {
      let res;
      res = await fetch(
        editingCoupon?._id
          ? `${API}/admin/coupons/${editingCoupon._id}`
          : `${API}/admin/coupons`,
        {
          method: editingCoupon?._id ? "PUT" : "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to save coupon");
      fetchCoupons();
      setShowModal(false);
      setEditingCoupon(null);
      setCode("");
      setService("");
      setDiscountType("percentage");
      setDiscountValue(0);
      setStartDate("");
      setEndDate("");
      setEnabled(true);
    } catch (err: any) {
      console.error("Save coupon error:", err);
      alert(err.message || "Error saving coupon");
    }
  };

  // ========================== EDIT / DELETE ==========================

  const formatDateForInput = (date?: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };
  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setService(coupon.service || "");
    setDiscountType(coupon.discountType || "percentage");
    setDiscountValue(coupon.discountValue || 0);
    setStartDate(formatDateForInput(coupon.startDate));
    setEndDate(formatDateForInput(coupon.endDate));
    setEnabled(coupon.enabled);
    setShowModal(true);
  };

  const handleDelete = async (_id?: string) => {
    if (!_id || !confirm("Delete this coupon?")) return;

    try {
      const res = await fetch(`${API}/admin/coupons/${_id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to delete coupon");
      fetchCoupons();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleCoupon = async (coupon: Coupon) => {
    try {
      const res = await fetch(`${API}/admin/coupons/${coupon._id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          enabled: !coupon.enabled,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      fetchCoupons();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center py-20">Loading coupons...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Coupon Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base"
        >
          + Create Coupon
        </button>
      </div>

      {/* Mobile Card Layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        {coupons.map((c, index) => (
          <motion.div
            key={c._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg tracking-wide">{c.code}</h3>
                <p className="text-sm text-gray-500">{c.service || "All Services"}</p>
              </div>
              <button
                onClick={() => toggleCoupon(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${c.enabled ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
              >
                {c.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                {c.discountType === "percentage" ? `${c.discountValue}% OFF` : c.discountType === "amount" ? `₹${c.discountValue} OFF` : "-"}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${getTimeRemaining(c.endDate) === "Expired" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
              >
                {getTimeRemaining(c.endDate)}
              </span>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>Start: {c.startDate ? new Date(c.startDate).toLocaleString() : "-"}</p>
              <p>End: {c.endDate ? new Date(c.endDate).toLocaleString() : "-"}</p>
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={() => handleEdit(c)} className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-xl text-sm cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="flex-1 px-3 py-2 bg-red-500 text-white rounded-xl text-sm cursor-pointer">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white">
              <th className="py-3 px-4 text-left">Code</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Discount</th>
              <th className="py-3 px-4 text-left">Start</th>
              <th className="py-3 px-4 text-left">End</th>
              <th className="py-3 px-4 text-left">Timer</th>
              <th className="py-3 px-4 text-left">Enabled</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c, index) => (
              <motion.tr
                key={c._id || index}
                whileHover={{ scale: 1.01 }}
                className="border-b border-white/20"
              >
                <td className="py-3 px-4 font-semibold">{c.code}</td>
                <td className="py-3 px-4">{c.service || "All Services"}</td>
                <td className="py-3 px-4">
                  {c.discountType === "percentage"
                    ? `${c.discountValue}%`
                    : c.discountType === "amount"
                      ? `₹${c.discountValue}`
                      : "-"}
                </td>
                <td className="py-3 px-4">{c.startDate ? new Date(c.startDate).toLocaleString() : "-"}</td>
                <td className="py-3 px-4">{c.endDate ? new Date(c.endDate).toLocaleString() : "-"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded ${getTimeRemaining(c.endDate) === "Expired"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      }`}
                  >
                    {getTimeRemaining(c.endDate)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleCoupon(c)}
                    className={`px-3 py-1 rounded text-xs cursor-pointer ${c.enabled
                      ? "bg-green-500 text-white"
                      : "bg-gray-300"
                      }`}
                  >
                    {c.enabled ? "Enabled" : "Disabled"}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(c)} className="px-3 py-2 bg-blue-500 text-white rounded-xl cursor-pointer text-sm">Edit</button>
                    <button onClick={() => handleDelete(c._id)} className="px-3 py-2 bg-red-500 text-white rounded-xl cursor-pointer text-sm">Delete</button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold cursor-pointer">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-center">{editingCoupon ? "Edit Coupon" : "Create Coupon"}</h2>

            <input
              type="text"
              placeholder="Coupon Code (e.g., SAVE10)"
              value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl"
            />

            <input
              type="text"
              placeholder="Service (optional, leave blank for all services)"
              value={service} onChange={(e) => setService(e.target.value)}
              className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl"
            />

            {/* Discount Type Switch */}
            <div className="flex gap-4 mb-4">
              <button
                className={`flex-1 py-2 rounded-xl shadow-md ${discountType === "percentage" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 cursor-pointer"}`}
                onClick={() => setDiscountType("percentage")}
              >
                Percentage %
              </button>
              <button
                className={`flex-1 py-2 rounded-xl shadow-md ${discountType === "amount" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 cursor-pointer"}`}
                onClick={() => setDiscountType("amount")}
              >
                Amount ₹
              </button>
            </div>

            <input
              type="text"
              placeholder={`Discount Value (${discountType === "percentage" ? "%" : "₹"})`}
              value={discountValue || ""}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val < 0) val = 0;
                if (discountType === "percentage" && val > 100) {
                  val = 100;
                  setDiscountWarning("Percentage cannot exceed 100%");
                } else setDiscountWarning("");
                setDiscountValue(val);
              }}
              className="w-full p-4 mb-1 border-2 border-gray-300 rounded-xl"
            />
            {discountWarning && <p className="text-red-500 text-sm mb-4">{discountWarning}</p>}

            <label className="block text-sm font-medium text-gray-700 mb-1">Starting Date&Time:</label>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl" />
            <label>Ending Date&Time:</label>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl" />

            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} /> Enabled
            </label>
            <button
              onClick={handleSaveCoupon}
              disabled={discountValue <= 0}
              className={`w-full py-3 rounded-xl font-bold shadow-md transition-transform ${discountValue <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white hover:scale-105"
                }`}
            >
              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}