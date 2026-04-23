"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const serviceOptionsByType = {
  regular: [
    "Haircut",
    "Shaving",
    "Beard Set",
    "Lotus Scrub",
    "Lotus Gel",
    "Lotus Pack",
    "Lotus Cleanser",
    "Oxy Life",
    "Gold Bleach",
    "Nature Bleach",
    "Fruit Bleach",
    "Normal Wash",
    "L'Oréal Shampoo Wash",
    "L'Oréal Colour",
    "Garnier Colour",
    "Streak Colour",
    "Fruit Colour",
    "Shahnaz Husain Gold Facial",
    "Shahnaz Husain Silver Facial",
    "Blossom Kochhar Facial",
    "Korean Glass Facial",
    "Lotus Professional Facial",
    "O3+ Bridal Facial Kit",
    "Ozone Facial",
    "L'Oréal Spa",
    "Schwarzkopf Spa",
    "Streak Spa",
    "Normal Oil",
    "Hair Oil Massage",
    "Hair Serum Massage",
    "Eye Brow Threading",
    "Upper-Lip/Chin Threading",
    "Full Face Threading",
    "Face Wax(Honey)",
    "Half Hand Wax(Honey)",
    "Full Hand Wax(Honey)",
    "Half Leg Wax(Honey)",
    "Full Leg Wax(Honey)",
    "Underarm Waxing(Honey)",
    "Full Body Wax(Honey)",
    "Full Hand Wax(Chocolate)",
    "Full Leg Wax(Chocolate)",
    "Underarm wax(Chocolate)",
    "Full Body Wax(Chocolate)",
    "Manicure(Normal)",
    "Pedicure(Normal)",
    "Manicure(Special)",
    "Pedicure(Special)",
    "Full-Body(Normal)",
    "Full-Body(Special)",
    "Ozone D-Tan",
    "Raaga D-Tan",
    "O3+ D-Tan",
    "Fruit Clean-Up",
    "Whitening Clean-Up",
    "Pearl Clean-Up",
    "Gold Clean-Up",
    "Diamond Clean-Up",
  ],
  makeup: [
    "Party Makeup",
    "Engagement Makeup",
    "Reception Makeup",
    "Haldi Makeup",
    "Day Party Makeup",
    "Evening Party Makeup",
    "Night Party Makeup",
  ],
  bridal: [
    "Bridal Makeup",
    "Bengali Bridal Makeup",
    "South Indian Bridal Makeup",
  ],
  academy: [
    "Basic Course",
    "Makeup Course",
    "Basic to Makeup",
    "Hair Dresser Course",
    "Full Course",
  ],
};

interface Promotion {
  _id?: string;
  title: string;
  serviceType: "regular" | "makeup" | "bridal" | "academy";
  serviceName: string;
  discountType?: "percentage" | "amount";
  discountValue?: number;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  showCountdown?: boolean;
}

export default function PromotionsPage() {
  const router = useRouter();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  const [title, setTitle] = useState("");
  const [serviceType, setServiceType] = useState<"regular" | "makeup" | "bridal" | "academy">("regular");
  const [serviceName, setServiceName] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "amount">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [showCountdown, setShowCountdown] = useState(true);
  const [discountWarning, setDiscountWarning] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const validOptions = serviceOptionsByType[serviceType] || [];
    if (serviceName && !validOptions.includes(serviceName)) {
      setServiceName("");
    }
  }, [serviceType]);

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

  // ========================== FETCH PROMOTIONS ==========================
  const fetchPromotions = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return router.push("/admin-login");

    try {
      setLoading(true);

      const res = await fetch(`${API}/admin/promotions`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch promotions");

      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Failed to fetch");

      setPromotions(data.promotions || []);
    } catch (err: any) {
      console.error("Fetch promotions error:", err);
      setError(err.message || "Error fetching promotions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeRemaining = (end?: string) => {
    if (!end) return "-";
    const total = new Date(end).getTime() - now;
    if (total <= 0) return "Expired";
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    return `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // ========================== SAVE PROMOTION ==========================
  const handleSavePromotion = async () => {
    if (!title) return alert("Title is required");

    if (discountValue <= 0) {
      return alert("Discount must be greater than 0");
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return alert("End date cannot be before start date");
    }

    const payload = {
      title,
      serviceType,
      serviceName: serviceName.trim() || null,
      discountType,
      discountValue,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDate ? new Date(endDate).toISOString() : undefined,
      enabled,
      showCountdown,
    };

    try {
      let res;
      res = await fetch(
        editingPromotion?._id
          ? `${API}/admin/promotions/${editingPromotion._id}`
          : `${API}/admin/promotions`,
        {
          method: editingPromotion?._id ? "PUT" : "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to save promotion");
      fetchPromotions();
      setShowModal(false);
      setEditingPromotion(null);
      setTitle("");
      setServiceType("regular");
      setServiceName("");
      setDiscountType("percentage");
      setDiscountValue(0);
      setStartDate("");
      setEndDate("");
      setEnabled(true);
      setShowCountdown(true);
    } catch (err: any) {
      console.error("Save promotion error:", err);
      alert(err.message || "Error saving promotion");
    }
  };

  const formatDateForInput = (date?: string) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setTitle(promotion.title);
    setServiceType(promotion.serviceType);
    setServiceName(promotion.serviceName || "");
    setDiscountType(promotion.discountType || "percentage");
    setDiscountValue(promotion.discountValue || 0);
    setStartDate(formatDateForInput(promotion.startDate));
    setEndDate(formatDateForInput(promotion.endDate));
    setEnabled(promotion.enabled);
    setShowCountdown(promotion.showCountdown !== false);
    setShowModal(true);
  };

  const handleDelete = async (_id?: string) => {
    if (!_id || !confirm("Delete this promotion?")) return;

    try {
      const res = await fetch(`${API}/admin/promotions/${_id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to delete promotion");
      fetchPromotions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const togglePromotion = async (promotion: Promotion) => {
    try {
      const res = await fetch(`${API}/admin/promotions/${promotion._id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: promotion.title,
          serviceType: promotion.serviceType,
          serviceName: promotion.serviceName,
          discountType: promotion.discountType,
          discountValue: promotion.discountValue,
          startDate: promotion.startDate,
          endDate: promotion.endDate,
          showCountdown: promotion.showCountdown,
          enabled: !promotion.enabled,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      fetchPromotions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center py-20">Loading promotions...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Limited Time Promotions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base"
        >
          + Create Promotion
        </button>
      </div>

      {/* Mobile Card Layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        {promotions.map((p, index) => (
          <motion.div
            key={p._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-500 capitalize">{p.serviceType}{p.serviceName ? ` — ${p.serviceName}` : ""}</p>
              </div>
              <button
                onClick={() => togglePromotion(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${p.enabled ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
              >
                {p.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                {p.discountType === "percentage" ? `${p.discountValue}% OFF` : p.discountType === "amount" ? `₹${p.discountValue} OFF` : "-"}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${getTimeRemaining(p.endDate) === "Expired" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
              >
                {getTimeRemaining(p.endDate)}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${p.showCountdown ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                Countdown: {p.showCountdown ? "On" : "Off"}
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={() => handleEdit(p)} className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-xl text-sm cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="flex-1 px-3 py-2 bg-red-500 text-white rounded-xl text-sm cursor-pointer">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Discount</th>
              <th className="py-3 px-4 text-left">Timer</th>
              <th className="py-3 px-4 text-left">Countdown</th>
              <th className="py-3 px-4 text-left">Enabled</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((p, index) => (
              <motion.tr
                key={p._id || index}
                whileHover={{ scale: 1.01 }}
                className="border-b border-white/20"
              >
                <td className="py-3 px-4 font-semibold">{p.title}</td>
                <td className="py-3 px-4 capitalize">{p.serviceType}</td>
                <td className="py-3 px-4">{p.serviceName || "All"}</td>
                <td className="py-3 px-4">
                  {p.discountType === "percentage"
                    ? `${p.discountValue}%`
                    : p.discountType === "amount"
                      ? `₹${p.discountValue}`
                      : "-"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded ${getTimeRemaining(p.endDate) === "Expired"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      }`}
                  >
                    {getTimeRemaining(p.endDate)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs rounded ${p.showCountdown ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                    {p.showCountdown ? "Show" : "Hide"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => togglePromotion(p)}
                    className={`px-3 py-1 rounded text-xs cursor-pointer ${p.enabled
                      ? "bg-green-500 text-white"
                      : "bg-gray-300"
                      }`}
                  >
                    {p.enabled ? "Enabled" : "Disabled"}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(p)} className="px-3 py-2 bg-blue-500 text-white rounded-xl cursor-pointer text-sm">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="px-3 py-2 bg-red-500 text-white rounded-xl cursor-pointer text-sm">Delete</button>
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
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold cursor-pointer">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-center">{editingPromotion ? "Edit Promotion" : "Create Promotion"}</h2>

            <input
              type="text"
              placeholder="Promotion Title (e.g., Limited Time Offer)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as "regular" | "makeup" | "bridal" | "academy")}
                className="w-full p-2 border-2 border-gray-300 rounded-xl"
              >
                <option value="regular">Regular Services</option>
                <option value="makeup">Makeup Services</option>
                <option value="bridal">Bridal Packages</option>
                <option value="academy">Academy Courses</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name (Optional)</label>
              <select
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl"
              >
                <option value="">All services</option>
                {(serviceOptionsByType[serviceType] || []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

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

            <label className="block text-sm font-medium text-gray-700 mb-1">Ending Date&Time:</label>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl" />

            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} /> Enabled
            </label>

            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="checkbox" checked={showCountdown} onChange={(e) => setShowCountdown(e.target.checked)} /> Show Countdown Timer
            </label>

            <button
              onClick={handleSavePromotion}
              disabled={discountValue <= 0}
              className={`w-full py-3 rounded-xl font-bold shadow-md transition-transform ${discountValue <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white hover:scale-105"
                }`}
            >
              {editingPromotion ? "Update Promotion" : "Create Promotion"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
