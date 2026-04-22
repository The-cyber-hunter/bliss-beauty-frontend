"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { useEffect } from "react";
import 'react-time-picker/dist/TimePicker.css';
import PaymentModal from "@/components/PaymentModal";
import BookingSuccessModal from "@/components/BookingSuccessModal";

declare global {
    interface Window {
        Razorpay: any;
    }
}


const CountdownTimer = ({ endDate }: { endDate: string }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const end = new Date(endDate).getTime();
        const updateTimer = () => {
            const now = new Date().getTime();
            const remaining = Math.max(0, Math.floor((end - now) / 1000));
            setTimeLeft(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [endDate]);

    if (timeLeft <= 0) {
        return (
            <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
                Offer Expired
            </div>
        );
    }

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-md inline-block">
            ⏳ Ends in {formatTime(timeLeft)}
        </div>
    );
};


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

/** Turn lat/lng into a readable address (no placeholder API key). */
async function reverseGeocodeToAddress(lat: number, lon: number): Promise<string> {
    const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (googleKey) {
        try {
            const res = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleKey}`
            );
            const data = await res.json();
            const addr = data.results?.[0]?.formatted_address;
            if (addr) return addr;
        } catch {
            /* fall through */
        }
    }

    try {
        const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        if (res.ok) {
            const d = await res.json();
            const parts = [d.locality, d.city, d.principalSubdivision, d.postcode, d.countryName].filter(
                (p: string, i: number, arr: string[]) => p && arr.indexOf(p) === i
            );
            const line = parts.join(", ");
            if (line) return line;
        }
    } catch {
        /* fall through */
    }

    try {
        const res = await fetch(`https://photon.komoot.io/reverse?lon=${lon}&lat=${lat}`);
        if (res.ok) {
            const data = await res.json();
            const p = data.features?.[0]?.properties;
            if (p) {
                const street = [p.housenumber, p.street].filter(Boolean).join(" ").trim();
                const bits = [street || p.name, p.district, p.city || p.county, p.state, p.postcode, p.country].filter(
                    Boolean
                ) as string[];
                const unique = bits.filter((x, i) => bits.indexOf(x) === i);
                if (unique.length) return unique.join(", ");
            }
        }
    } catch {
        /* fall through */
    }

    return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
}

export default function Services() {
    const [activeTab, setActiveTab] = useState("regular");
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"home" | "salon">("home");
    const [selectedDate, setSelectedDate] = useState(""); // from input
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // for salon slots only
    const [address, setAddress] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [availableSlots, setAvailableSlots] = useState<any[]>([]);
    const [activePromotions, setActivePromotions] = useState<any>({});
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState<{
        bookingId: string;
        finalAmount: number;
        variant: "cod" | "online";
    } | null>(null);
    const isPastSelectedDate = (() => {
        if (!selectedDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);
        return selected < today;
    })();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";


    useEffect(() => {
        const fetchActivePromotions = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/bookings/active-promotions`, {
                    cache: "no-store",
                });
                const data = await res.json();
                if (data.success) {
                    setActivePromotions(data.promotions);
                }
            } catch (error) {
                console.error("Failed to fetch promotions:", error);
            }
        };

        fetchActivePromotions();
    }, [BACKEND_URL]);

    const getApplicablePromotion = (serviceName: string, serviceType: string) => {
        const promotions = activePromotions[serviceType] || [];
        return promotions.find((promo: any) =>
            !promo.serviceName || promo.serviceName === serviceName
        );
    };

    useEffect(() => {
        if (mode === "salon" && selectedDate) {
            const fetchSlots = async () => {
                try {
                    const res = await fetch(`${BACKEND_URL}/api/bookings/available-slots?date=${selectedDate}`);
                    const data = await res.json();

                    if (data.success) {
                        setAvailableSlots(data.slots || []);
                    } else {
                        setAvailableSlots([]);
                    }
                } catch (err) {
                    console.error("Failed to fetch slots:", err);
                    setAvailableSlots([]);
                }
            };

            fetchSlots();
        }
    }, [selectedDate, mode]);

    // Refetch slots when window gains focus (user returns to page)
    useEffect(() => {
        const handleFocus = () => {
            if (mode === "salon" && selectedDate) {
                const fetchSlots = async () => {
                    try {
                        const res = await fetch(`${BACKEND_URL}/api/bookings/available-slots?date=${selectedDate}`);
                        const data = await res.json();
                        if (data.success) {
                            setAvailableSlots(data.slots || []);
                        } else {
                            setAvailableSlots([]);
                        }
                    } catch (err) {
                        console.error("Failed to fetch slots:", err);
                        setAvailableSlots([]);
                    }
                };

                fetchSlots();
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [mode, selectedDate, BACKEND_URL]);

    useEffect(() => {
        // Reset coupon and discount when services change
        setCoupon("");
        setDiscount(0);
        setCouponMsg("");
    }, [selectedServices]);

    useEffect(() => {
        // Reset discount and message when coupon input is cleared
        if (!coupon.trim()) {
            setDiscount(0);
            setCouponMsg("");
        }
    }, [coupon]);

    const handleBooking = () => {
        // ✅ Validation only — then show payment modal
        if (!name || !phone || !email || !selectedDate || (mode === "salon" && !selectedTimeSlot)) {
            alert("Please fill all required fields ⚠️");
            return;
        }
        if (mode === "home" && !address) {
            alert("Please enter address for home service 🏠");
            return;
        }
        setShowPaymentModal(true);
    };

    const resetForm = () => {
        setShowModal(false);
        setShowPaymentModal(false);
        setSelectedServices([]);
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setSelectedTimeSlot("");
        setCoupon("");
        setDiscount(0);
    };

    const buildBookingPayload = () => {
        const prices: Record<string, number> = {};
        const serviceTypes: Record<string, string> = {};
        selectedServices.forEach(s => {
            prices[s.name] = mode === "home" ? (s.originalHome || s.homePrice) : (s.originalSalon || s.salonPrice);
            serviceTypes[s.name] = s.serviceType || "regular";
        });

        const payload: Record<string, any> = {
            name,
            phone,
            email,
            services: selectedServices.map(s => s.name),
            mode,
            date: selectedDate,
            address,
            total: totalOriginal,
            prices,
            serviceTypes,
            couponCode: discount > 0 ? coupon.trim() : undefined,
        };
        if (mode === "salon") {
            payload["time"] = selectedTimeSlot;
        } else {
            delete payload["time"];
        }
        return payload;
    };

    const handlePaymentMethod = async (method: "online" | "cod") => {
        let skipFinallyLoading = false;
        try {
            setLoading(true);

            const bookingPayload = buildBookingPayload();
            bookingPayload.paymentMethod = method;

            if (method === "cod") {
                const bookingRes = await fetch(`${BACKEND_URL}/api/bookings`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingPayload),
                });
                const bookingData = await bookingRes.json();

                if (!bookingData.success) {
                    alert(`Booking Failed ❌\n${bookingData.message || ""}`);
                    return;
                }

                const { bookingId, finalAmount } = bookingData.booking;
                setBookingSuccess({
                    bookingId,
                    finalAmount,
                    variant: "cod",
                });
                resetForm();
                return;
            }

            // Online: create Razorpay order only (no booking in DB until payment succeeds)
            const orderRes = await fetch(`${BACKEND_URL}/api/bookings/razorpay-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingPayload),
            });
            const orderData = await orderRes.json();

            if (!orderData.success) {
                alert(`Failed to start payment ❌\n${orderData.message || ""}`);
                return;
            }

            const frozenPayload = { ...bookingPayload, paymentMethod: "online" as const };

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag",
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: "BLISS Beauty & Wellness",
                description: "BLISS Beauty booking",
                order_id: orderData.order.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch(`${BACKEND_URL}/api/bookings/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                ...frozenPayload,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                            }),
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            const bid = verifyData.booking?.bookingId || verifyData.booking?.id;
                            const famt = verifyData.booking?.finalAmount ?? 0;
                            setBookingSuccess({
                                bookingId: bid,
                                finalAmount: famt,
                                variant: "online",
                            });
                            resetForm();
                        } else {
                            alert(`Payment verification failed ❌\n${verifyData.message || "Please contact support."}`);
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert("Payment verification error ❌\nPlease contact support.");
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: { name, email, contact: phone },
                theme: { color: "#D4AF37" },
                modal: {
                    ondismiss: function () {
                        alert("Payment cancelled. No booking was created.");
                        setLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on("payment.failed", function (response: any) {
                alert(`Payment Failed ❌\n${response.error.description}`);
                setLoading(false);
            });
            razorpay.open();
            skipFinallyLoading = true;
        } catch (error) {
            console.error(error);
            alert("Server Error ❌");
        } finally {
            if (!skipFinallyLoading) setLoading(false);
        }
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
                    serviceType: service.serviceType || "regular",
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
                    serviceType: pkg.serviceType || "bridal",
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

    // 📍 Get current location → full address (or coordinates if geocoding fails)
    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        setAddress("Fetching address…");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const line = await reverseGeocodeToAddress(latitude, longitude);
                    setAddress(line);
                } catch {
                    setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                }
            },
            () => {
                setAddress("");
                alert("Unable to retrieve location");
            }
        );
    };

    const applyCoupon = async () => {
        if (!coupon.trim()) {
            setCouponMsg("Please enter a coupon code");
            setDiscount(0);
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/bookings/validate-coupon`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: coupon.trim(),
                    services: selectedServices.map(s => ({
                        name: s.name,
                        price: mode === "home" ? s.homePrice : s.salonPrice,
                    })),
                }),
            });

            const data = await res.json();

            if (data.success) {
                setDiscount(data.discount);
                setCouponMsg(`🎉 ₹${data.discount} discount applied!`);
            } else {
                setDiscount(0);
                setCouponMsg(`❌ ${data.message}`);
            }
        } catch (err) {
            console.error("Coupon validation error:", err);
            setDiscount(0);
            setCouponMsg("❌ Error validating coupon");
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

                                        const promotion = getApplicablePromotion(service.name, "regular");
                                        const hasPromotion = !!promotion;

                                        let discountedHomePrice = service.homePrice;
                                        let discountedSalonPrice = service.salonPrice;
                                        let discountAmount = 0;

                                        if (hasPromotion) {
                                            if (promotion.discountType === "percentage") {
                                                discountAmount = Math.round((service.homePrice * promotion.discountValue) / 100);
                                                discountedHomePrice = service.homePrice - discountAmount;
                                                discountedSalonPrice = service.salonPrice - Math.round((service.salonPrice * promotion.discountValue) / 100);
                                            } else {
                                                discountAmount = promotion.discountValue;
                                                discountedHomePrice = Math.max(0, service.homePrice - promotion.discountValue);
                                                discountedSalonPrice = Math.max(0, service.salonPrice - promotion.discountValue);
                                            }
                                        }

                                        return (
                                            <motion.div
                                                key={service.name}
                                                onClick={() => {
                                                    toggleService({
                                                        name: service.name,
                                                        homePrice: discountedHomePrice,
                                                        salonPrice: discountedSalonPrice,
                                                        originalHome: service.homePrice,
                                                        originalSalon: service.salonPrice,
                                                        serviceType: "regular",
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
                                                    {hasPromotion ? (
                                                        <>
                                                            <span className="line-through text-gray-400 mr-2">
                                                                ₹{service.homePrice}
                                                            </span>
                                                            <span className="text-[#D4AF37] font-semibold">
                                                                ₹{discountedHomePrice}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-[#2D2D2D] font-semibold">
                                                            ₹{service.homePrice}
                                                        </span>
                                                    )}
                                                </p>

                                                {/* PROMOTION */}
                                                {hasPromotion && (
                                                    <div className="mt-3 space-y-1">
                                                        {/* 💸 Savings */}
                                                        <div className="text-xs text-pink-700 bg-pink-50 py-1 rounded-md">
                                                            You save ₹{discountAmount} (
                                                            {promotion.discountType === "percentage"
                                                                ? `${promotion.discountValue}% OFF`
                                                                : `₹${promotion.discountValue} OFF`
                                                            })
                                                        </div>

                                                        {/* ⏳ Countdown */}
                                                        {promotion.showCountdown && (
                                                            <CountdownTimer endDate={promotion.endDate} />
                                                        )}

                                                        {/* 🎁 Title */}
                                                        <div className="text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                                                            {promotion.title}
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

                        const promotion = getApplicablePromotion(service.name, "makeup");
                        const hasPromotion = !!promotion;

                        let discountedPrice = service.offerPrice;
                        let discountAmount = 0;

                        if (hasPromotion) {
                            if (promotion.discountType === "percentage") {
                                discountAmount = Math.round((service.price * promotion.discountValue) / 100);
                                discountedPrice = service.price - discountAmount;
                            } else {
                                discountAmount = promotion.discountValue;
                                discountedPrice = Math.max(0, service.price - promotion.discountValue);
                            }
                        }

                        return (
                            <motion.div
                                key={service.name}
                                onClick={() =>
                                    toggleService({
                                        name: service.name,
                                        homePrice: discountedPrice,
                                        salonPrice: discountedPrice,
                                        originalHome: service.price,
                                        originalSalon: service.price,
                                        serviceType: "makeup",
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

                                <div className="text-gray-600 mb-2">
                                    {hasPromotion ? (
                                        <>
                                            <div className="line-through text-gray-400 mr-2">
                                                ₹{service.price}
                                            </div>
                                            <div className="text-[#D4AF37] font-semibold">
                                                ₹{discountedPrice}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-[#2D2D2D] font-semibold">
                                            ₹{service.price}
                                        </div>
                                    )}
                                    {hasPromotion && (
                                        <div className="mt-3 space-y-1">
                                            {/* 💸 Savings */}
                                            <div className="text-xs text-pink-700 bg-pink-50 py-1 rounded-md">
                                                You save ₹{discountAmount} (
                                                {promotion.discountType === "percentage"
                                                    ? `${promotion.discountValue}% OFF`
                                                    : `₹${promotion.discountValue} OFF`
                                                })
                                            </div>
                                            {/* ⏳ Countdown */}
                                            {promotion.showCountdown && (
                                                <CountdownTimer endDate={promotion.endDate} />
                                            )}
                                            {/* 🎁 Title */}
                                            <div className="text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                                                {promotion.title}
                                            </div>
                                        </div>
                                    )}
                                    {/* 🎁 First user */}
                                    <div className="text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                                        ⏳ Limited Time Offer
                                    </div>
                                </div>

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

                        const promotion = getApplicablePromotion(pkg.name, "bridal");
                        const hasPromotion = !!promotion;

                        let discountedPrice = pkg.offerPrice;
                        let discountAmount = 0;

                        if (hasPromotion) {
                            if (promotion.discountType === "percentage") {
                                discountAmount = Math.round((pkg.price * promotion.discountValue) / 100);
                                discountedPrice = pkg.price - discountAmount;
                            } else {
                                discountAmount = promotion.discountValue;
                                discountedPrice = Math.max(0, pkg.price - promotion.discountValue);
                            }
                        }

                        return (
                            <motion.div
                                key={i}
                                onClick={() => {
                                    toggleBridalPackage({
                                        ...pkg,
                                        offerPrice: discountedPrice,
                                        serviceType: "bridal",
                                    });
                                }}
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

                                {hasPromotion ? (
                                    <>
                                        <p className="text-gray-400 line-through">
                                            ₹{pkg.price}
                                        </p>
                                        <p className="font-semibold text-lg text-[#D4AF37]">
                                            ₹{discountedPrice}
                                        </p>
                                    </>
                                ) : (
                                    <p className="font-semibold text-lg text-[#2D2D2D]">
                                        ₹{pkg.price}
                                    </p>
                                )}
                                {hasPromotion && (
                                    <div className="mt-3 space-y-1">

                                        {/* 💸 Savings */}
                                        <div className="text-xs text-pink-700 bg-pink-50 py-1 rounded-md">
                                            You save ₹{discountAmount} (
                                            {promotion.discountType === "percentage"
                                                ? `${promotion.discountValue}% OFF`
                                                : `₹${promotion.discountValue} OFF`
                                            })
                                        </div>

                                        {/* ⏳ Countdown */}
                                        {promotion.showCountdown && (
                                            <CountdownTimer endDate={promotion.endDate} />
                                        )}

                                        {/* 🎁 Title */}
                                        <div className="text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                                            {promotion.title}
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
                            {/* Salon Time Slots */}
                            {mode === "salon" && (
                                <div className="mb-4">
                                    <p className="text-gray-600 mb-2">Select a Time Slot</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {availableSlots.length > 0 ? (
                                            availableSlots.map((slot) => (
                                                <button
                                                    key={slot.time}
                                                    onClick={() => !isPastSelectedDate && slot.available && setSelectedTimeSlot(slot.time)}
                                                    disabled={isPastSelectedDate || !slot.available}
                                                    className={`px-3 py-1 rounded-lg border ${selectedTimeSlot === slot.time && !isPastSelectedDate
                                                        ? "bg-[#D4AF37] text-white"
                                                        : !isPastSelectedDate && slot.available
                                                            ? "border-gray-400 text-gray-700 hover:bg-[#D4AF37] hover:text-white cursor-pointer"
                                                            : "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100"
                                                        }`}
                                                >
                                                    {slot.time} {isPastSelectedDate ? "- Expired" : !slot.available ? "- Booked" : ""}
                                                </button>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 col-span-3">
                                                {isPastSelectedDate
                                                    ? "Past date selected. Slots are expired."
                                                    : "No slots available. Please choose another date."}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Selected Services */}
                            <ul className="text-sm mb-4">
                                {selectedServices.map((s, i) => (
                                    <li key={i}>{s.name}</li>
                                ))}
                            </ul>

                            {/* Total */}
                            <div className="mb-4">
                                <p className="text-gray-600">Total Price</p>

                                <h3 className="text-2xl font-semibold text-[#D4AF37]">
                                    ₹{finalTotal}
                                </h3>

                                {discount > 0 && (
                                    <p className="text-green-600 text-sm">
                                        You saved ₹{discount} with coupon! 🎉
                                    </p>
                                )}
                            </div>
                            {/* Inputs */}
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="w-full border p-2 mb-3 rounded"
                            />

                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone"
                                className="w-full border p-2 mb-3 rounded"
                            />

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full border p-2 mb-3 rounded"
                            />

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                            {/* Time / Slots */}
                            {mode === "salon" && (
                                <div className="mb-3">

                                    {/* 👇 Message when no date selected */}
                                    {!selectedDate && (
                                        <p className="text-sm text-red-500 mb-2">
                                            Please select a date first
                                        </p>
                                    )}

                                    <p className="text-sm text-gray-600 mb-2">
                                        Available Slots
                                    </p>

                                    <div className="grid grid-cols-3 gap-2">

                                        {/* 👇 Message when no date selected */}
                                        {!selectedDate && (
                                            <p className="text-sm text-red-500 col-span-3">
                                                Please select a date first
                                            </p>
                                        )}

                                        {selectedDate && availableSlots.length === 0 && (
                                            <p className="text-sm text-gray-500 col-span-3">
                                                {isPastSelectedDate
                                                    ? "Past date selected. All slots are expired."
                                                    : "No slots available for this date 😔"}
                                            </p>
                                        )}

                                        {selectedDate && availableSlots.length > 0 && (
                                            availableSlots.map((slot) => (
                                                <motion.button
                                                    key={slot.time}
                                                    onClick={() => !isPastSelectedDate && slot.available && setSelectedTimeSlot(slot.time)}
                                                    disabled={isPastSelectedDate || !slot.available}
                                                    className={`border rounded-lg py-2 text-sm transition-all duration-200 ${selectedTimeSlot === slot.time && !isPastSelectedDate
                                                        ? "bg-[#D4AF37] text-white"
                                                        : !isPastSelectedDate && slot.available
                                                            ? "hover:bg-[#D4AF37] hover:text-white cursor-pointer border-gray-400 text-gray-700"
                                                            : "cursor-not-allowed border-gray-300 text-gray-400 bg-gray-100"
                                                    }`}
                                                    whileHover={!isPastSelectedDate && slot.available ? { scale: 1.05 } : {}}
                                                    whileTap={!isPastSelectedDate && slot.available ? { scale: 0.95 } : {}}
                                                >
                                                    {slot.time} {isPastSelectedDate ? "- Expired" : !slot.available ? "- Booked" : ""}
                                                </motion.button>
                                            ))
                                        )}
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
                                        onChange={(e) => setCoupon(e.target.value.toUpperCase())}
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

                            <button
                                onClick={handleBooking}
                                disabled={loading}
                                className="w-full bg-[#D4AF37] text-white py-3 rounded-lg cursor-pointer disabled:opacity-50"
                            >
                                {loading ? "Processing..." : "Confirm Booking"}
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
            {showPaymentModal && (
                <PaymentModal
                    amount={finalTotal}
                    loading={loading}
                    onSelectMethod={handlePaymentMethod}
                    onClose={() => setShowPaymentModal(false)}
                />
            )}
            {bookingSuccess && (
                <BookingSuccessModal
                    bookingId={bookingSuccess.bookingId}
                    finalAmount={bookingSuccess.finalAmount}
                    variant={bookingSuccess.variant}
                    onClose={() => setBookingSuccess(null)}
                />
            )}
        </div >
    );
}