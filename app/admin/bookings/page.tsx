"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Booking {
  _id: string;
  bookingId: string;
  name: string;
  phone: string;
  email: string;
  services: string[];
  mode: "home" | "salon";
  date: string;
  time: string;
  address?: string;
  finalAmount: number;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  paymentMethod?: "online" | "cod";
}

function paymentModeLabel(method?: string) {
  if (method === "cod") return "COD";
  if (method === "online") return "Online";
  return "—";
}

function paymentModeBadgeClass(method?: string) {
  if (method === "cod") return "bg-amber-100 text-amber-800";
  if (method === "online") return "bg-sky-100 text-sky-800";
  return "bg-gray-100 text-gray-600";
}

function statusBadgeClass(status?: string) {
  if (status === "completed") return "bg-green-100 text-green-600";
  if (status === "cancelled") return "bg-gray-200 text-gray-700";
  if (status === "confirmed") return "bg-blue-100 text-blue-700";
  return "bg-yellow-100 text-yellow-600";
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"home" | "salon">("home");

  // ✅ FIXED: use correct env variable
  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  // ==============================
  // 📊 FETCH BOOKINGS
  // ==============================
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/admin/bookings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ==============================
  // 🚫 CANCEL BOOKING (status → cancelled, email to customer, track page updates)
  // ==============================
  const cancelBooking = async (id: string) => {
    if (
      !confirm(
        "Cancel this booking? The customer will get a cancellation email and will see “cancelled” on the track booking page."
      )
    )
      return;

    try {
      const res = await fetch(`${BASE_URL}/api/admin/bookings/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      fetchBookings();
    } catch (err) {
      console.error("Cancel error:", err);
      alert(err instanceof Error ? err.message : "Could not cancel booking");
    }
  };

  // ==============================
  // ✅ MARK COMPLETE
  // ==============================
  const markComplete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
        },
        body: JSON.stringify({ status: "completed" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      fetchBookings();
    } catch (err) {
      console.error("Update error:", err);
    }
  };


  // Split bookings by mode
  const homeBookings = bookings.filter(
    (b) => b.mode === "home" && b.name.toLowerCase().includes(search.toLowerCase())
  );
  const salonBookings = bookings.filter(
    (b) => b.mode === "salon" && b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Bookings Manager</h1>

      {/* Toggle Home/Salon */}
      <div className="flex gap-2 sm:gap-4 mb-4">
        <button
          className={`px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base ${activeTab === "home" ? "bg-[#D4AF37] text-white" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          Home Bookings
        </button>
        <button
          className={`px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base ${activeTab === "salon" ? "bg-[#D4AF37] text-white" : ""}`}
          onClick={() => setActiveTab("salon")}
        >
          Salon Bookings
        </button>
      </div>

      {/* 🔍 Search */}
      <input
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 border p-2 rounded w-full max-w-md"
      />

      {/* ✅ LOADING STATE */}
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <>
          {/* Mobile Card Layout */}
          <div className="flex flex-col gap-4 lg:hidden">
            {(activeTab === "home" ? homeBookings : salonBookings).map((b) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{b.name}</h3>
                    <p className="text-xs text-gray-500">#{b.bookingId}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${statusBadgeClass(b.status)}`}
                  >
                    {b.status || "pending"}
                  </span>
                </div>

                <div className="text-sm space-y-1">
                  <p><span className="text-gray-500">Services:</span></p>
                  <div className="flex flex-wrap gap-1">
                    {b.services?.map((s, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">• {s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <p><span className="text-gray-500">Date:</span> {new Date(b.date).toLocaleDateString("en-IN")}</p>
                  {activeTab === "salon" && <p><span className="text-gray-500">Time:</span> {b.time}</p>}
                  {activeTab === "home" && b.address && <p><span className="text-gray-500">Address:</span> {b.address}</p>}
                </div>

                <p className="text-sm">
                  <span className="text-gray-500">Payment:</span>{" "}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paymentModeBadgeClass(b.paymentMethod)}`}>
                    {paymentModeLabel(b.paymentMethod)}
                  </span>
                </p>

                <p className="text-[#D4AF37] font-bold text-lg">₹{b.finalAmount}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {b.status === "pending" && (
                    <button
                      onClick={() => markComplete(b._id)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-xl text-sm cursor-pointer"
                    >
                      Confirm
                    </button>
                  )}
                  {b.status !== "completed" && b.status !== "cancelled" && (
                    <button
                      onClick={() => markComplete(b._id)}
                      className="px-3 py-2 bg-green-500 text-white rounded-xl text-sm cursor-pointer"
                    >
                      Done
                    </button>
                  )}
                  {b.status !== "completed" && b.status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => cancelBooking(b._id)}
                      className="px-3 py-2 rounded-xl text-sm cursor-pointer bg-orange-600 text-white hover:bg-orange-700"
                    >
                      Cancel booking
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="text-left">Name</th>
                <th className="text-left">Services</th>
                {activeTab === "salon" && <th className="text-left">Time</th>}
                {activeTab === "home" && <th className="text-left">Address</th>}
                <th className="text-left">Date</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Payment</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "home" ? homeBookings : salonBookings).map((b) => (
                <tr key={b._id} className="border-b">
                  <td className="p-3">{b.bookingId}</td>
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">
                    {b.services?.map((s, i) => (
                      <div key={i} className="text-sm">• {s}</div>
                    ))}
                  </td>
                  {activeTab === "salon" && <td className="p-3">{b.time}</td>}
                  {activeTab === "home" && <td className="p-3">{b.address}</td>}
                  <td className="p-3">{new Date(b.date).toLocaleDateString("en-IN")}</td>
                  <td className="p-3 text-[#D4AF37] font-semibold">₹{b.finalAmount}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${paymentModeBadgeClass(b.paymentMethod)}`}
                    >
                      {paymentModeLabel(b.paymentMethod)}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded ${statusBadgeClass(b.status)}`}>
                      {b.status || "pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2 flex-wrap">
                    {b.status === "pending" && (
                      <button
                        onClick={() => markComplete(b._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm cursor-pointer"
                      >
                        Confirm
                      </button>
                    )}
                    {b.status !== "completed" && b.status !== "cancelled" && (
                      <button
                        onClick={() => markComplete(b._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm cursor-pointer"
                      >
                        Done
                      </button>
                    )}
                    {b.status !== "completed" && b.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={() => cancelBooking(b._id)}
                        className="px-3 py-1 bg-orange-600 text-white rounded text-sm cursor-pointer hover:bg-orange-700"
                      >
                        Cancel booking
                      </button>
                    )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
        )}
      </motion.div>
    );
  }