"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-lg 
      p-6 rounded-2xl shadow-lg border border-white/30"
    >
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="text-3xl font-bold mt-2 text-[#1A2A3A]">
        {value}
      </h3>
    </motion.div>
  );
}