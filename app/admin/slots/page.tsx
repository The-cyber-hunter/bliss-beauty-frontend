"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Slot {
  _id: string;
  time: string;
  available: boolean;
  isBlocked?: boolean;
  maxBookings: number;
  booked: number;
}
// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function SlotsPage() {
  const router = useRouter();
  const [allSlots, setAllSlots] = useState<Slot[]>([]); // full data from backend
  const [slots, setSlots] = useState<Slot[]>([]); // filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editSlotId, setEditSlotId] = useState<string | null>(null);
  const [editTime, setEditTime] = useState("");
  const [editMax, setEditMax] = useState<number>(1);
  const [actionLoading, setActionLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newMax, setNewMax] = useState(1);

  // ✅ Filters
  const [filterDate, setFilterDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const debouncedSearchTime = useDebounce(searchTime, 400); // 400ms debounce
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const API = `${BACKEND_URL}/api`;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      localStorage.removeItem("adminToken");
      router.push("/admin-login");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;

      let url = `${API}/admin/slots`;
      if (filterDate) url += `?date=${filterDate}`;

      const res = await fetch(url, {
        headers: authHeaders,
      });
      const data = await res.json();

      if (!data.success) {
        localStorage.removeItem("adminToken");
        router.push("/admin-login");
        return;
      }

      const mappedSlots = data.slots.map((s: any) => ({
        _id: s._id,
        time: s.time,
        available: !s.isBlocked && s.booked < s.maxBookings,
        booked: s.booked,
        maxBookings: s.maxBookings,
        isBlocked: s.isBlocked,
        date: s.date,
      }));

      setAllSlots(mappedSlots); // store full list
      setSlots(mappedSlots); // initially display all
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!debouncedSearchTime) {
      setSlots(allSlots);
    } else {
      const filtered = allSlots.filter((slot) =>
        slot.time.toLowerCase().includes(debouncedSearchTime.toLowerCase())
      );
      setSlots(filtered);
    }
  }, [debouncedSearchTime, allSlots]);

  useEffect(() => {
    fetchSlots();
  }, [router, filterDate]); // search filter is handled locally

  const handleToggleBlock = async (id: string) => {
    setActionLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;
      const res = await fetch(`${API}/admin/slots/${id}/toggle`, {
        method: "PATCH",
        headers: authHeaders,
      });
      const data = await res.json();
      if (data.success) fetchSlots();
      else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error updating slot");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slot?")) return;
    setActionLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;
      const res = await fetch(`${API}/admin/slots/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const data = await res.json();
      if (data.success) fetchSlots();
      else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error deleting slot");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editTime || !editMax) return;
    setActionLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;
      const res = await fetch(`${API}/admin/slots/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          time: formatTo12Hour(editTime),
          maxBookings: editMax,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditSlotId(null);
        fetchSlots();
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error updating slot");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateSlot = async () => {
    if (!newDate || !newTime || !newMax) {
      alert("All fields are required");
      return;
    }
    setActionLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders) return;
      const res = await fetch(`${API}/admin/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          date: newDate,
          time: formatTo12Hour(newTime),
          maxBookings: newMax,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewDate("");
        setNewTime("");
        setNewMax(1);
        fetchSlots();
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error creating slot");
    } finally {
      setActionLoading(false);
    }
  };

  const formatTo12Hour = (time: string) => {
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  if (loading) return <p className="text-center py-20">Loading slots...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-0">
      {/* ==================== Header ==================== */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Slots</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-xl px-4 py-2 cursor-pointer flex-1 min-w-[140px] sm:flex-none"
          />
          <input
            type="text"
            placeholder="Search by Time..."
            value={searchTime}
            onChange={(e) => setSearchTime(e.target.value)}
            className="border rounded-xl px-4 py-2 flex-1 min-w-[140px] sm:flex-none"
          />
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            + Create Slot
          </button>
        </div>
      </div>

      {/* ==================== Slots Grid ==================== */}
      {slots.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No slots found
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {slots.map((slot) => (
          <motion.div
            key={slot._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md flex justify-between items-center"
          >
            {editSlotId === slot._id ? (
              <div className="flex-1">
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="border p-2 rounded mb-2 w-full"
                  placeholder="Time"
                />
                <input
                  type="number"
                  value={editMax}
                  onChange={(e) => setEditMax(Number(e.target.value))}
                  className="border p-2 rounded w-full"
                  placeholder="Max Bookings"
                  min={1}
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold text-lg">{slot.time}</p>

                {/* ✅ Status Badge */}
                <p
                  className={`text-xs px-2 py-1 rounded mt-1 inline-block ${slot.isBlocked
                      ? "bg-red-100 text-red-600"
                      : slot.booked >= slot.maxBookings
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                >
                  {slot.isBlocked
                    ? "Blocked"
                    : slot.booked >= slot.maxBookings
                      ? "Full"
                      : "Open"}
                </p>

                {/* ✅ Booking Count */}
                <p className="text-xs text-gray-500 mt-1">
                  Booked: {slot.booked} / {slot.maxBookings}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2 ml-4">
              {editSlotId === slot._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(slot._id)}
                    disabled={actionLoading}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditSlotId(null)}
                    className="px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditSlotId(slot._id);
                      setEditTime(slot.time);
                      setEditMax(slot.maxBookings || 1);
                    }}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleBlock(slot._id)}
                    className={`px-3 py-2 rounded-xl text-white shadow-md hover:scale-105 transition ${slot.isBlocked ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {slot.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    disabled={slot.booked > 0}
                    onClick={() => handleDelete(slot._id)}
                    className={`px-3 py-2 rounded-xl shadow-md transition ${slot.booked > 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==================== Create Slot Modal ==================== */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold cursor-pointer transition"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Create New Slot</h2>

            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition cursor-pointer"
            />
            <input
              type="time"
              placeholder="Time (e.g., 10:00 AM)"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition"
            />
            <input
              type="number"
              placeholder="Max Bookings"
              value={newMax}
              onChange={(e) => setNewMax(Number(e.target.value))}
              min={1}
              className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 font-medium transition"
            />

            <button
              onClick={handleCreateSlot}
              disabled={actionLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white font-bold shadow-md hover:scale-105 transition-transform"
            >
              {actionLoading ? "Creating..." : "Create Slot"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}