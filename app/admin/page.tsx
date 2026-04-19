"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatCard from "@/components/admin/statcard";
import { motion } from "framer-motion";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

interface Booking {
  _id: string;
  services: string[];
  date: string;
  time: string;
  total: number;
  mode: string;
}

interface Slot {
  _id: string;
  isBlocked?: boolean;
  booked?: number;
  maxBookings?: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          router.push("/admin-login");
          return;
        }
        // Fetch bookings for selected date only
        const [bookRes, slotRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/admin/bookings?date=${selectedDate}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BACKEND_URL}/api/admin/slots?date=${selectedDate}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const bookData = await bookRes.json();
        const slotData = await slotRes.json();
        if (!bookData.success || !slotData.success) {
          localStorage.removeItem("adminToken");
          router.push("/admin-login");
          return;
        }
        setBookings(bookData.bookings);
        setSlots(slotData.slots);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        router.push("/admin-login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router, BACKEND_URL, selectedDate]);

  if (loading) return <p className="text-center py-20">Loading dashboard...</p>;

  // Bookings are already filtered by selected date from backend
  const filteredBookings = bookings;

  const stats = [
    {
      title: "Revenue",
      value: `₹${filteredBookings.reduce((sum, b) => sum + (b.total || 0), 0)}`,
    },
    {
      title: "Bookings",
      value: filteredBookings.length,
    },
    {
      title: "Active Slots",
      value: slots.filter((s) => !s.isBlocked).length,
    },
    {
      title: "Cancelled Bookings",
      value: filteredBookings.filter((b) => (b as any).status === "cancelled").length,
    },
  ];

  // Weekly bookings chart
  const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const lineData = {
    labels: weekLabels,
    datasets: [
      {
        label: "Bookings",
        data: weekLabels.map((day) =>
          bookings.filter((b) => {
            const d = new Date(b.date);
            return d.toLocaleString("en-US", { weekday: "short" }) === day;
          }).length
        ),
        borderColor: "#D4AF37",
        backgroundColor: "rgba(212, 175, 55, 0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: false },
    },
  };

  // Service distribution chart
  const serviceCounts: Record<string, number> = {};
  filteredBookings.forEach((b) => {
    b.services.forEach((service) => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });
  });

  const pieData = {
    labels: Object.keys(serviceCounts),
    datasets: [
      {
        label: "Services",
        data: Object.values(serviceCounts),
        backgroundColor: ["#D4AF37", "#FDD835", "#FFC107", "#FFB300"],
      },
    ],
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-0">
      {/* Header with properly aligned date picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <label htmlFor="dashboard-date" className="hidden md:inline-block text-gray-700 font-semibold tracking-wide text-lg">
            <span className="bg-gradient-to-r from-[#D4AF37] to-yellow-600 bg-clip-text text-transparent">Select Date:</span>
          </label>
          <div>
            <input
              id="dashboard-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="appearance-none border-0 outline-none rounded-xl px-4 py-2 bg-white/90 shadow-lg text-gray-800 font-medium text-base focus:ring-2 focus:ring-[#D4AF37] transition-all duration-200 w-44 md:w-52 hover:shadow-xl cursor-pointer"
              style={{ boxShadow: '0 2px 12px 0 rgba(212,175,55,0.08)' }}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 overflow-x-hidden">
        <motion.div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-lg min-w-0">
          <h2 className="font-semibold mb-3">Weekly Bookings</h2>
          <div className="w-full min-w-0">
            <Line data={lineData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-lg min-w-0">
          <h2 className="font-semibold mb-3">Service Distribution</h2>
          <div className="w-full min-w-0">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}