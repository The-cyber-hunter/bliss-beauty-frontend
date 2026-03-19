"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

const servicesData = [
    { name: "Facial", homePrice: 499, salonPrice: 399 },
    { name: "Haircut", homePrice: 299, salonPrice: 199 },
    { name: "Waxing", homePrice: 699, salonPrice: 599 },
];

export default function Services() {
    const [activeTab, setActiveTab] = useState("regular");
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"home" | "salon">("home");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [address, setAddress] = useState("");

    const toggleService = (service: any) => {
        const exists = selectedServices.find((s) => s.name === service.name);
        if (exists) {
            setSelectedServices(selectedServices.filter((s) => s.name !== service.name));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const total = selectedServices.reduce(
        (sum, s) => sum + (mode === "home" ? s.homePrice : s.salonPrice),
        0
    );

    // 📍 Get current location
    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
                    );
                    const data = await res.json();
                    const location = data.results[0]?.formatted_address;

                    setAddress(location || "Location detected");
                } catch (err) {
                    setAddress("Location detected");
                }
            },
            () => {
                alert("Unable to retrieve location");
            }
        );
    };

    return (
        <div className="min-h-screen bg-[#F9F8F7] text-[#2D2D2D]">
            <Navbar />

            <div className="p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab("regular")}
                        className={`px-6 py-2 rounded-lg border cursor-pointer ${activeTab === "regular"
                            ? "bg-[#D4AF37] text-white"
                            : "border-[#2D2D2D]"
                            }`}
                    >
                        Regular Services
                    </button>

                    <button
                        onClick={() => setActiveTab("bridal")}
                        className={`px-6 py-2 rounded-lg border cursor-pointer ${activeTab === "bridal"
                            ? "bg-[#D4AF37] text-white"
                            : "border-[#2D2D2D]"
                            }`}
                    >
                        Bridal & Wedding 👑
                    </button>
                </div>

                {/* Regular Services */}
                {activeTab === "regular" && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {servicesData.map((service, i) => {
                            const isSelected = selectedServices.find(
                                (s) => s.name === service.name
                            );

                            return (
                                <motion.div
                                    key={service.name}
                                    onClick={() => toggleService(service)}
                                    className={`p-6 rounded-2xl text-center border transition cursor-pointer relative ${isSelected ? "border-[#D4AF37] bg-[#fffaf0]" : "border-[#2D2D2D]"}`}
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}>
                                    {/* Check Icon */}
                                    <div
                                        className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center ${isSelected
                                            ? "bg-[#D4AF37] border-[#D4AF37]"
                                            : "border-gray-400"
                                            }`}
                                    >
                                        {isSelected && (
                                            <span className="text-white text-xs">✓</span>
                                        )}
                                    </div>

                                    <h2 className="text-xl font-semibold">{service.name}</h2>
                                    <p className="text-gray-600 mb-2">
                                        Home: ₹{service.homePrice} | Salon: ₹{service.salonPrice}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {isSelected ? "Selected" : "Tap to select"}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Bridal */}
                {activeTab === "bridal" && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Basic Bridal",
                                price: 4999,
                                includes: ["Makeup", "Hairstyling", "Draping"],
                            },
                            {
                                name: "Premium Bridal 👑",
                                price: 9999,
                                includes: ["HD Makeup", "Facial", "Hairstyling", "Draping"],
                            },
                            {
                                name: "Luxury Bridal",
                                price: 14999,
                                includes: ["Airbrush Makeup", "Full Skin Prep", "Hairstyling", "Draping"],
                            },
                        ].map((pkg, i) => {
                            const isSelected = selectedServices.find((s) => s.name === pkg.name);
                            return (
                                <motion.div
                                    key={i}
                                    onClick={() => {
                                        setSelectedServices([{ name: pkg.name, homePrice: pkg.price, salonPrice: pkg.price }]);
                                    }}
                                    className={`p-6 rounded-2xl text-center border cursor-pointer relative transition ${isSelected ? "border-[#D4AF37] bg-[#fffaf0]" : "border-[#2D2D2D]"}`}
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                >
                                    {/* Check Indicator */}
                                    <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "bg-[#D4AF37] border-[#D4AF37]" : "border-gray-400"
                                        }`}>
                                        {isSelected && (
                                            <span className="text-white text-xs">✓</span>
                                        )}
                                    </div>

                                    <h2 className="text-xl font-semibold">{pkg.name}</h2>
                                    <p className="text-gray-600 mb-2">Full Bridal Package</p>
                                    <p className="font-semibold text-lg">₹{pkg.price}</p>
                                    <ul className="mt-4 space-y-2 text-sm text-gray-600 text-center">
                                        {pkg.includes.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <span className="text-[#D4AF37]">✔</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-sm text-gray-500 mt-2">
                                        {isSelected ? "Selected" : "Tap to select"}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Bottom Bar */}
            {selectedServices.length > 0 && (
                <motion.div
                    className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex justify-between items-center"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    <p className="text-sm">
                        {selectedServices.length} services selected
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg cursor-pointer "
                    >
                        Continue
                    </button>
                </motion.div>
            )}

            {/* Modal */}
            {showModal && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white w-full max-w-lg rounded-2xl p-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            Complete Your Booking
                        </h2>

                        {/* Mode */}
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => setMode("home")}
                                className={`px-4 py-2 rounded-lg border ${mode === "home" ? "bg-[#D4AF37] text-white cursor-pointer" : "cursor-pointer"
                                    }`}
                            >
                                At Home
                            </button>

                            <button
                                onClick={() => setMode("salon")}
                                className={`px-4 py-2 rounded-lg border ${mode === "salon" ? "bg-[#D4AF37] text-white cursor-pointer" : "cursor-pointer "
                                    }`}
                            >
                                Visit Salon
                            </button>
                        </div>

                        {/* Selected Services */}
                        <ul className="text-sm mb-4">
                            {selectedServices.map((s, i) => (
                                <li key={i}>{s.name}</li>
                            ))}
                        </ul>

                        {/* Total */}
                        <div className="mb-4">
                            <p className="text-gray-600">Total Price</p>
                            <h3 className="text-2xl font-semibold">₹{total}</h3>
                        </div>

                        {/* Inputs */}
                        <input
                            placeholder="Name"
                            className="w-full border p-2 mb-3 rounded"
                        />
                        <input
                            placeholder="Phone"
                            className="w-full border p-2 mb-3 rounded"
                        />

                        <input
                            type="date"
                            className="w-full border p-2 mb-3 rounded"
                        />

                        {/* Time / Slots */}
                        {mode === "home" ? (
                            <input
                                type="time"
                                className="w-full border p-2 mb-3 rounded"
                            />
                        ) : (
                            <div className="mb-3">
                                <p className="text-sm text-gray-600 mb-2">
                                    Available Slots
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        "10:00 AM",
                                        "11:00 AM",
                                        "12:00 PM",
                                        "2:00 PM",
                                        "3:00 PM",
                                        "5:00 PM",
                                    ].map((slot) => (
                                        <motion.button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`border rounded-lg py-2 text-sm ${selectedSlot === slot ? "bg-[#D4AF37] text-white" : "hover:bg-[#D4AF37] hover:text-white"}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {slot}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Address */}
                        {mode === "home" && (
                            <div className="mb-3">
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                    className="w-full border p-2 rounded mb-2"
                                />

                                <button
                                    onClick={getLocation}
                                    className="text-sm text-[#D4AF37] cursor-pointer"
                                >
                                    📍 Use Current Location
                                </button>
                            </div>
                        )}

                        {/* Submit */}
                        <button className="w-full bg-[#D4AF37] text-white py-3 rounded-lg">
                            Confirm Booking
                        </button>

                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-3 text-sm text-gray-500"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}