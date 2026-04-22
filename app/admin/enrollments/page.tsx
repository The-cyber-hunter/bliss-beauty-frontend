"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

interface Enrollment {
  _id: string;
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  name: string;
  email: string;
  phone: string;
  paymentStatus: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  createdAt: string;
}

export default function AdminEnrollmentsPage() {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const API = `${BACKEND_URL}/api`;

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin-login");
        return;
      }

      const query = selectedDate ? `?date=${selectedDate}` : "";
      const res = await fetch(`${API}/admin/academy-enrollments${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.success) {
        localStorage.removeItem("adminToken");
        router.push("/admin-login");
        return;
      }

      setEnrollments(data.enrollments || []);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch academy enrollments.");
    } finally {
      setLoading(false);
    }
  }, [API, router, selectedDate]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const filteredEnrollments = useMemo(() => {
    if (!search.trim()) return enrollments;
    const q = search.toLowerCase();
    return enrollments.filter((e) =>
      [e.name, e.email, e.phone, e.courseTitle, e.enrollmentId, e.razorpayPaymentId]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [enrollments, search]);

  const handleDownloadAllEnrollments = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin-login");
        return;
      }

      // Intentionally fetch without date filter to include all records till now.
      const res = await fetch(`${API}/admin/academy-enrollments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.success) {
        localStorage.removeItem("adminToken");
        router.push("/admin-login");
        return;
      }

      const allEnrollments: Enrollment[] = data.enrollments || [];
      if (allEnrollments.length === 0) {
        alert("No enrollment records found to export.");
        return;
      }

      const header = [
        "Enrollment ID",
        "Date",
        "Student Name",
        "Email",
        "Phone",
        "Course",
        "Amount",
        "Payment Status",
        "Payment ID",
        "Order ID",
      ];

      const rows = allEnrollments.map((e) => [
        e.enrollmentId,
        new Date(e.createdAt).toLocaleString("en-IN"),
        e.name,
        e.email,
        e.phone,
        e.courseTitle,
        e.amount,
        e.paymentStatus,
        e.razorpayPaymentId,
        e.razorpayOrderId,
      ]);

      const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollments");
      XLSX.writeFile(
        workbook,
        `academy-enrollments-all-dates-${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (err) {
      console.error(err);
      alert("Unable to export enrollments right now.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading enrollments...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-0">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Academy Enrollments</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-xl px-4 py-2 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Search by name, course, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-2 min-w-[260px] flex-1"
          />
          <button
            onClick={() => {
              setSelectedDate("");
              setSearch("");
            }}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Clear
          </button>
          <button
            onClick={handleDownloadAllEnrollments}
            disabled={exporting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white shadow-md hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {exporting ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>

      {filteredEnrollments.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No enrolled students found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEnrollments.map((enrollment) => (
            <div
              key={enrollment._id}
              className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Enrollment ID</p>
                  <p className="font-semibold text-[#2D2D2D]">{enrollment.enrollmentId}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                  {enrollment.paymentStatus}
                </span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">Student:</span> {enrollment.name}</p>
                <p><span className="font-medium">Email:</span> {enrollment.email}</p>
                <p><span className="font-medium">Phone:</span> {enrollment.phone}</p>
                <p><span className="font-medium">Course:</span> {enrollment.courseTitle}</p>
                <p><span className="font-medium">Amount:</span> INR {enrollment.amount.toLocaleString("en-IN")}</p>
                <p><span className="font-medium">Payment ID:</span> {enrollment.razorpayPaymentId}</p>
                <p><span className="font-medium">Date:</span> {new Date(enrollment.createdAt).toLocaleString("en-IN")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
