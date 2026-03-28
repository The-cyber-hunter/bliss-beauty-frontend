"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { useEffect } from "react";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';


const servicesData = [
    {
        category: "Basic Services",
        services: [
            { name: "Haircut", homePrice: 150, salonPrice: 100, offer: 20 },
            { name: "Shaving", homePrice: 100, salonPrice: 50, offer: 10 },
            { name: "Beard Set", homePrice: 140, salonPrice: 70, offer: 30 },
        ],
    },
    {
        category: "Lotus Massage/Cleanup",
        services: [
            { name: "Lotus Scrub", homePrice: 450, salonPrice: 350, offer: 50 },
            { name: "Lotus Gel", homePrice: 450, salonPrice: 350, offer: 50 },
            { name: "Lotus Pack", homePrice: 450, salonPrice: 350, offer: 50 },
            { name: "Lotus Cleanser", homePrice: 450, salonPrice: 350, offer: 50 },
        ],
    },
    {
        category: "Bleach",
        services: [
            { name: "Oxy Life", homePrice: 400, salonPrice: 300, offer: 50 },
            { name: "Gold Bleach", homePrice: 350, salonPrice: 250, offer: 50 },
            { name: "Nature Bleach", homePrice: 300, salonPrice: 200, offer: 50 },
            { name: "Fruit Bleach", homePrice: 400, salonPrice: 300, offer: 50 },
        ],
    },
    {
        category: "Hair Wash",
        services: [
            { name: "Normal Wash", homePrice: 200, salonPrice: 100, offer: 50 },
            { name: "L'Oréal Shampoo Wash", homePrice: 300, salonPrice: 200, offer: 50 },
        ],
    },
    {
        category: "Hair Colour",
        services: [
            { name: "L'Oréal Colour", homePrice: 700, salonPrice: 600, offer: 50 },
            { name: "Garnier Colour", homePrice: 450, salonPrice: 350, offer: 50 },
            { name: "Streak Colour", homePrice: 400, salonPrice: 300, offer: 50 },
            { name: "Fruit Colour", homePrice: 450, salonPrice: 350, offer: 50 },
        ]
    },
    {
        category: "Facials",
        services: [
            { name: "Shahnaz Husain Gold Facial", homePrice: 1700, salonPrice: 1600, offer: 200 },
            { name: "Shahnaz Husain Silver Facial", homePrice: 1600, salonPrice: 1500, offer: 200 },
            { name: "Blossom Kochhar Facial", homePrice: 1900, salonPrice: 1800, offer: 200 },
            { name: "Korean Glass Facial", homePrice: 3100, salonPrice: 3000, offer: 200 },
            { name: "Lotus Professional Facial", homePrice: 2600, salonPrice: 2500, offer: 200 },
            { name: "O3+ Bridal Facial Kit", homePrice: 2600, salonPrice: 2500, offer: 200 },
            { name: "Ozone Facial", homePrice: 1900, salonPrice: 1800, offer: 200 },
        ]
    },
    {
        category: "Hair Spa",
        services: [
            { name: "L'Oréal Spa", homePrice: 700, salonPrice: 600, offer: 100 },
            { name: "Schwarzkopf Spa", homePrice: 600, salonPrice: 500, offer: 50 },
            { name: "Streak Spa", homePrice: 550, salonPrice: 450, offer: 50 },
        ]
    },
    {
        category: "Head Massage",
        services: [
            { name: "Normal Oil", homePrice: 200, salonPrice: 100, offer: 30 },
            { name: "Hair Oil Massage", homePrice: 250, salonPrice: 150, offer: 50 },
            { name: "Hair Serum Massage", homePrice: 250, salonPrice: 150, offer: 50 },
        ]
    },
    {
        category: "Threading",
        services: [
            { name: "Eye Brow Threading", homePrice: 100, salonPrice: 50, offer: 30 },
            { name: "Upper-Lip/Chin Threading", homePrice: 80, salonPrice: 30, offer: 25 },
            { name: "Full Face Threading", homePrice: 200, salonPrice: 100, offer: 50 },
        ]
    },
    {
        category: "Waxing",
        services: [
            { name: "Face Wax(Honey)", homePrice: 250, salonPrice: 150, offer: 50 },
            { name: "Half Hand Wax(Honey)", homePrice: 400, salonPrice: 300, offer: 50 },
            { name: "Full Hand Wax(Honey)", homePrice: 600, salonPrice: 500, offer: 50 },
            { name: "Half Leg Wax(Honey)", homePrice: 400, salonPrice: 300, offer: 50 },
            { name: "Full Leg Wax(Honey)", homePrice: 700, salonPrice: 600, offer: 50 },
            { name: "Underarm Waxing(Honey)", homePrice: 160, salonPrice: 80, offer: 30 },
            { name: "Full Body Wax(Honey)", homePrice: 1600, salonPrice: 1500, offer: 200 },
            { name: "Full Hand Wax(Chocolate)", homePrice: 700, salonPrice: 600, offer: 50 },
            { name: "Full Leg Wax(Chocolate)", homePrice: 900, salonPrice: 800, offer: 50 },
            { name: "Underarm wax(Chocolate)", homePrice: 200, salonPrice: 100, offer: 30 },
            { name: "Full Body Wax(Chocolate)", homePrice: 2600, salonPrice: 2500, offer: 300 },
        ]
    },
    {
        category: "Manicure/Pedicure",
        services: [
            { name: "Manicure(Normal)", homePrice: 500, salonPrice: 400, offer: 50 },
            { name: "Pedicure(Normal)", homePrice: 600, salonPrice: 500, offer: 50 },
            { name: "Manicure(Special)", homePrice: 700, salonPrice: 600, offer: 50 },
            { name: "Pedicure(Special)", homePrice: 900, salonPrice: 800, offer: 50 },
        ]
    },
    {
        category: "Body Polishing",
        services: [
            { name: "Full-Body(Normal)", homePrice: 1600, salonPrice: 1500, offer: 50 },
            { name: "Full-Body(Special)", homePrice: 2600, salonPrice: 2500, offer: 100 },
        ]
    },
    {
        category: "D-Tan",
        services: [
            { name: "Ozone D-Tan", homePrice: 400, salonPrice: 300, offer: 50 },
            { name: "Raaga D-Tan", homePrice: 500, salonPrice: 400, offer: 50 },
            { name: "O3+ D-Tan", homePrice: 600, salonPrice: 500, offer: 50 },
        ]
    },
    {
        category: "Clean-Up",
        services: [
            { name: "Fruit Clean-Up", homePrice: 500, salonPrice: 400, offer: 50 },
            { name: "Whitening Clean-Up", homePrice: 600, salonPrice: 500, offer: 50 },
            { name: "Pearl Clean-Up", homePrice: 700, salonPrice: 600, offer: 100 },
            { name: "Gold Clean-Up", homePrice: 800, salonPrice: 700, offer: 100 },
            { name: "Diamond Clean-Up", homePrice: 1100, salonPrice: 1000, offer: 100 },
        ]

    }
];

const makeupServices = [
    { name: "Party Makeup", price: 2500, offerPrice: 2000 },
    { name: "Engagement Makeup", price: 12000, offerPrice: 10000 },
    { name: "Reception Makeup", price: 10000, offerPrice: 8000 },
    { name: "Haldi Makeup", price: 2500, offerPrice: 2000 },
    { name: "Day Party Makeup", price: 2500, offerPrice: 2000 },
    { name: "Evening Party Makeup", price: 2500, offerPrice: 2000 },
    { name: "Night Party Makeup", price: 2500, offerPrice: 2000 },
];

const bridalPackages = [
    {
        name: "Bridal Makeup ",
        price: 17000,
        offerPrice: 15000,
        includes: ["Full Bridal Makeup", "Hairstyling", "Draping"],
    },
    {
        name: "Bengali Bridal Makeup",
        price: 17000,
        offerPrice: 15000,
        includes: ["Traditional Look", "Hairstyling", "Draping"],
    },
    {
        name: "South Indian Bridal Makeup",
        price: 17000,
        offerPrice: 15000,
        includes: ["Traditional Look", "Hairstyling", "Draping"],
    },
];
export default function Services() {
    const [activeTab, setActiveTab] = useState("regular");
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"home" | "salon">("home");
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [address, setAddress] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [timeLeft, setTimeLeft] = useState(3600);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState("");



    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);// 1 hour in seconds

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const toggleService = (service: any) => {
        const exists = selectedServices.find((s) => s.name === service.name);

        if (exists) {
            setSelectedServices(selectedServices.filter((s) => s.name !== service.name));
        } else {
            setSelectedServices([
                ...selectedServices,
                {
                    name: service.name,
                    homePrice: service.homePrice,
                    salonPrice: service.salonPrice,
                    originalHome: service.originalHome || service.homePrice,
                    originalSalon: service.originalSalon || service.salonPrice,
                },
            ]);
        }
    };

    // Toggle selection for bridal packages
    const toggleBridalPackage = (pkg: any) => {
        const exists = selectedServices.find((s) => s.name === pkg.name);

        if (exists) {
            setSelectedServices(selectedServices.filter((s) => s.name !== pkg.name));
        } else {
            setSelectedServices([
                ...selectedServices,
                {
                    name: pkg.name,
                    homePrice: pkg.offerPrice,
                    salonPrice: pkg.offerPrice,
                    originalHome: pkg.price,
                    originalSalon: pkg.price,
                },
            ]);
        }
    };


    const total = selectedServices.reduce(
        (sum, s) => sum + (mode === "home" ? s.homePrice : s.salonPrice),
        0
    );
    const totalOriginal = selectedServices.reduce(
        (sum, s) =>
            sum +
            (mode === "home"
                ? s.originalHome || s.homePrice
                : s.originalSalon || s.salonPrice),
        0
    );
    const savings = totalOriginal - total;
    const finalTotal = total - discount; // discount will come from coupon

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

    const applyCoupon = () => {
        if (coupon === "FIRST50") {
            setDiscount(50);
            setCouponMsg("🎉 ₹50 discount applied!");
        } else if (coupon === "BRIDE200") {
            setDiscount(200);
            setCouponMsg("💍 ₹200 bridal discount applied!");
        } else {
            setDiscount(0);
            setCouponMsg("❌ Invalid coupon");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F8F7] text-[#2D2D2D]">
            <Navbar />

            <div className="flex justify-center gap-4 mb-8 flex-wrap">
                <h1 className="text-3xl font-bold w-full text-center mb-4 mt-10">Our Services</h1>
                {["regular", "makeup", "bridal"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setSelectedServices([]);
                        }}
                        className={`px-6 py-2 rounded-lg border capitalize cursor-pointer ${activeTab === tab
                            ? "bg-[#D4AF37] text-white"
                            : "border-[#2D2D2D]"
                            }`}
                    >
                        {tab === "regular" && "Regular Services"}
                        {tab === "makeup" && "Makeup Services 💄"}
                        {tab === "bridal" && "Bridal Packages 👰"}
                    </button>
                ))}
            </div>

            {/* Regular Services */}
            {activeTab === "regular" && (
                <div className="px-4 space-y-10">

                    {/* 🔍 Search Bar */}
                    <div className="flex justify-center mb-6">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        />
                    </div>

                    {servicesData.map((group, index) => {
                        const filteredServices = group.services.filter((service) =>
                            service.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (filteredServices.length === 0) return null;

                        return (
                            <div key={index}>

                                {/* 💎 CENTER HEADING */}
                                <div className="flex justify-center mb-6 mt-4">
                                    <h2 className="text-xl font-semibold text-[#2D2D2D] text-center">
                                        {group.category}
                                        <span className="block h-[2px] w-12 bg-[#D4AF37] mx-auto mt-2 rounded-full"></span>
                                    </h2>
                                </div>

                                {/* 🔥 SAME CARD GRID */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {filteredServices.map((service, i) => {
                                        const isSelected = selectedServices.find(
                                            (s) => s.name === service.name
                                        );

                                        return (
                                            <motion.div
                                                key={service.name}
                                                onClick={() => {
                                                    const isExpired = timeLeft === 0;

                                                    toggleService({
                                                        name: service.name,
                                                        homePrice: isExpired
                                                            ? service.homePrice
                                                            : service.homePrice - (service.offer || 0),
                                                        salonPrice: isExpired
                                                            ? service.salonPrice
                                                            : service.salonPrice - (service.offer || 0),
                                                        originalHome: service.homePrice,
                                                        originalSalon: service.salonPrice,
                                                    });
                                                }}
                                                className={`p-6 rounded-2xl text-center border transition cursor-pointer relative ${isSelected
                                                    ? "border-[#D4AF37] bg-[#fffaf0]"
                                                    : "border-[#2D2D2D]"
                                                    }`}
                                                whileHover={{
                                                    scale: 1.05,
                                                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {/* CHECK */}
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

                                                {/* NAME */}
                                                <h2 className="text-xl font-semibold">
                                                    {service.name}
                                                </h2>

                                                {/* PRICE */}
                                                <p className="text-gray-600 mb-2">
                                                    <span className="line-through text-gray-400 mr-2">
                                                        ₹{service.homePrice}
                                                    </span>
                                                    <span className="text-[#D4AF37] font-semibold">
                                                        ₹{service.homePrice - (service.offer || 0)}
                                                    </span>
                                                </p>

                                                {/* OFFER */}
                                                {service.offer > 0 && (
                                                    <div className="mt-3 space-y-1">

                                                        {/* 💸 Savings */}
                                                        <div className="text-xs text-pink-700 bg-pink-50 py-1 rounded-md">
                                                            You save ₹{service.offer} (
                                                            {Math.round(
                                                                (service.offer / service.homePrice) * 100
                                                            )}
                                                            % OFF)
                                                        </div>

                                                        {/* ⏳ Countdown */}
                                                        {timeLeft > 0 ? (
                                                            <div className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-md inline-block">
                                                                ⏳ Ends in {formatTime(timeLeft)}
                                                            </div>
                                                        ) : (
                                                            <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
                                                                Offer Expired
                                                            </div>
                                                        )}

                                                        {/* 🎁 First user */}
                                                        <div className="text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                                                            ⏳ Limited Time Offer
                                                        </div>
                                                    </div>
                                                )}

                                                <p className="text-sm text-gray-500">
                                                    {isSelected ? "Selected" : "Tap to select"}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            { /* Makeup Services */}
            {activeTab === "makeup" && (
                <div className="grid md:grid-cols-3 gap-6 px-4 ">
                    {makeupServices.map((service, i) => {
                        const isSelected = selectedServices.find(
                            (s) => s.name === service.name
                        );

                        return (
                            <motion.div
                                key={service.name}
                                onClick={() =>
                                    toggleService({
                                        name: service.name,
                                        homePrice: service.offerPrice,
                                        salonPrice: service.offerPrice,
                                        originalHome: service.price,
                                        originalSalon: service.price,
                                    })
                                }
                                className={`p-6 rounded-2xl text-center border cursor-pointer relative transition ${isSelected
                                    ? "border-[#D4AF37] bg-[#fffaf0]"
                                    : "border-[#2D2D2D]"
                                    }`}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                {/* Check */}
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

                                <h2 className="text-xl font-semibold">
                                    {service.name}
                                </h2>

                                <span className="text-gray-600 mb-2">
                                    <div className="line-through text-gray-400 mr-2">
                                        ₹{service.price}
                                    </div>
                                    <div className="text-[#D4AF37] font-semibold">
                                        ₹{service.offerPrice}
                                    </div>
                                    {service.price > service.offerPrice && (
                                        <div className="mt-3 space-y-1">

                                            {/* 💸 Savings */}
                                            <div className="text-xs text-pink-700 bg-pink-50 py-1 rounded-md">
                                                You save ₹{service.price - service.offerPrice} (
                                                {Math.round(((service.price - service.offerPrice) / service.price) * 100)}% OFF)
                                            </div>

                                            {/* ⏳ Countdown */}
                                            {timeLeft > 0 ? (
                                                <div className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-md inline-block">
                                                    ⏳ Ends in {formatTime(timeLeft)}
                                                </div>
                                            ) : (
                                                <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
                                                    Offer Expired
                                                </div>
                                            )}

                                            {/* 🎁 First user */}
                                            <div className="text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                                                ⏳ Limited Time Offer
                                            </div>
                                        </div>
                                    )}
                                </span>

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
                <div className="grid md:grid-cols-3 gap-6 px-4">
                    {bridalPackages.map((pkg, i) => {
                        const isSelected = selectedServices.find(
                            (s) => s.name === pkg.name
                        );

                        return (
                            <motion.div
                                key={i}
                                onClick={() => toggleBridalPackage(pkg)}
                                className={`p-6 rounded-2xl text-center border cursor-pointer relative transition ${isSelected
                                    ? "border-[#D4AF37] bg-[#fffaf0]"
                                    : "border-[#2D2D2D]"
                                    }`}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                {/* Check */}
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

                                <h2 className="text-xl font-semibold">{pkg.name}</h2>

                                <p className="text-gray-600 mb-2">
                                    Full Bridal Package
                                </p>

                                <p className="text-gray-400 line-through">
                                    ₹{pkg.price}
                                </p>

                                <p className="font-semibold text-lg text-[#D4AF37]">
                                    ₹{pkg.offerPrice}
                                </p>
                                {pkg.price > pkg.offerPrice && (
                                    <div className="mt-3 space-y-1">

                                        {/* 💸 Savings */}
                                        <div className="text-xs text-pink-700 bg-pink-50 py-1 rounded-md">
                                            You save ₹{pkg.price - pkg.offerPrice} (
                                            {Math.round(((pkg.price - pkg.offerPrice) / pkg.price) * 100)}% OFF)
                                        </div>

                                        {/* ⏳ Countdown */}
                                        {timeLeft > 0 ? (
                                            <div className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-md inline-block">
                                                ⏳ Ends in {formatTime(timeLeft)}
                                            </div>
                                        ) : (
                                            <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
                                                Offer Expired
                                            </div>
                                        )}

                                        {/* 🎁 First user */}
                                        <div className="text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                                           ⏳ Limited Time Offer
                                        </div>
                                    </div>
                                )}
                                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                    {pkg.includes.map((item: string, idx: number) => (
                                        <li key={idx}>✔ {item}</li>
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

            {/* Bottom Bar */}
            {
                selectedServices.length > 0 && (
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
                )
            }

            {/* Modal */}
            {
                showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto modal-scrollbar"
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

                                <p className="line-through text-gray-400">
                                    ₹{totalOriginal}
                                </p>

                                <h3 className="text-2xl font-semibold text-[#D4AF37]">
                                    ₹{finalTotal}
                                </h3>

                                {discount > 0 && (
                                    <p className="text-green-600 text-sm">
                                        Coupon applied: -₹{discount}
                                    </p>
                                )}

                                {savings > 0 && (
                                    <p className="text-green-600 text-sm">
                                        You saved ₹{savings} 🎉
                                    </p>
                                )}
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

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedSlot}
                                    onChange={(e) => setSelectedSlot(e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            {/* Time / Slots */}
                            {mode === "home" ? (
                                <div className="mb-3 cursor-pointer">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Time
                                    </label>
                                    <input
                                        type="time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="w-full border p-2 rounded cursor-pointer"
                                    />
                                </div>
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
                                                className={`border rounded-lg py-2 cursor-pointer text-sm ${selectedSlot === slot ? "bg-[#D4AF37] text-white" : "hover:bg-[#D4AF37] hover:text-white"}`}
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
                            {/* 🎁 Coupon Section */}
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 ">
                                    Apply Coupon
                                </label>

                                <div className="flex gap-2 mt-1">
                                    <input
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        placeholder="Enter code (FIRST50)"
                                        className="flex-1 border p-2 rounded"
                                    />

                                    <button
                                        onClick={applyCoupon}
                                        className="bg-black text-white px-4 rounded cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </div>

                                {couponMsg && (
                                    <p className="text-xs mt-1 text-green-600">{couponMsg}</p>
                                )}
                            </div>

                            <button className="w-full bg-[#D4AF37] text-white py-3 rounded-lg cursor-pointer">
                                Confirm Booking
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-3 text-sm text-gray-500 cursor-pointer py-3 rounded-lg border w-full"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )
            }
        </div >
    );
}