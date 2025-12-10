import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone, Scissors, User } from "lucide-react"; // Import User icon
import { useAuth } from "@clerk/clerk-react"; // Removed SignInButton
import { useServices } from "../context/ServiceContext";

const BookingModal = ({ isOpen, onClose }) => {
    const { isSignedIn, getToken } = useAuth();
    const { services } = useServices();
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        serviceId: "",
        date: "",
        startTime: "",
        phone: "",
        customerName: "", // Added customerName
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
            setErrors({});
            // Reset form when modal opens (optional, depends on UX preference)
            // setFormData({ serviceId: "", date: "", startTime: "", phone: "", customerName: "" });
        }
    }, [isOpen]);

    // Fetch available slots when service and date are selected
    useEffect(() => {
        if (formData.serviceId && formData.date) {
            fetchAvailableSlots();
        }
    }, [formData.serviceId, formData.date]);

    const fetchAvailableSlots = async () => {
        try {
            setLoading(true);
            // Public route now, no token needed for slots
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/bookings/available?serviceId=${formData.serviceId}&date=${formData.date}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                setAvailableSlots([]);
                return;
            }

            const data = await response.json();
            setAvailableSlots(data);
        } catch (error) {
            console.error("Failed to fetch slots:", error);
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validation
        const newErrors = {};
        if (!formData.serviceId) newErrors.serviceId = "Please select a service";
        if (!formData.date) newErrors.date = "Please select a date";
        if (!formData.startTime) newErrors.startTime = "Please select a time slot";
        if (!formData.phone) newErrors.phone = "Please enter your phone number";
        if (!isSignedIn && !formData.customerName) newErrors.customerName = "Please enter your name"; // Name required for guests

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            const headers = {
                "Content-Type": "application/json",
            };

            // If user is signed in, attach token (Backend handles it)
            if (isSignedIn) {
                const token = await getToken();
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setFormData({ serviceId: "", date: "", startTime: "", phone: "", customerName: "" });
                    setSuccess(false);
                }, 2000);
            } else {
                const error = await response.json();
                setErrors({ submit: error.message || "Booking failed" });
            }
        } catch (error) {
            setErrors({ submit: "Failed to create booking. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm sm:p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: "100%" }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative w-full h-full sm:h-auto sm:max-w-md bg-neutral-900 sm:border border-white/10 sm:rounded-2xl shadow-2xl overflow-y-auto sm:overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center">
                                    <Scissors className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-neutral-900">
                                        Book Appointment
                                    </h2>
                                    <p className="text-sm text-neutral-800">
                                        Reserve your slot now
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form (Always Visible) */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm"
                                >
                                    ✓ Booking created successfully!
                                </motion.div>
                            )}

                            {/* Service Selection */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2">
                                    Select Service
                                </label>
                                <div className="relative">
                                    <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                                    <select
                                        value={formData.serviceId}
                                        onChange={(e) => handleChange("serviceId", e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white focus:border-amber-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Choose a service...</option>
                                        {services.map((service) => (
                                            <option key={service._id} value={service._id}>
                                                {service.name} ({service.duration} min)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.serviceId && (
                                    <p className="mt-1 text-xs text-red-400">{errors.serviceId}</p>
                                )}
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2">
                                    Select Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => handleChange("date", e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                        style={{ colorScheme: "dark" }}
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
                                    />
                                </div>
                                {errors.date && (
                                    <p className="mt-1 text-xs text-red-400">{errors.date}</p>
                                )}
                            </div>

                            {/* Time Slot Selection */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2">
                                    Available Time Slots
                                </label>
                                {loading && formData.serviceId && formData.date ? (
                                    <div className="text-center py-4 text-neutral-400">
                                        Loading slots...
                                    </div>
                                ) : availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                        {availableSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => handleChange("startTime", slot)}
                                                className={`py-3 sm:py-2 px-2 sm:px-3 rounded-lg text-sm font-bold transition-all ${formData.startTime === slot
                                                    ? "bg-amber-500 text-neutral-900"
                                                    : "bg-neutral-800 text-white hover:bg-neutral-700 border border-white/10"
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                ) : formData.serviceId && formData.date ? (
                                    <div className="text-center py-4 text-neutral-400 text-sm">
                                        No available slots for this date
                                    </div>
                                ) : (
                                    <div className="text-center py-4 text-neutral-500 text-sm">
                                        Select service and date first
                                    </div>
                                )}
                                {errors.startTime && (
                                    <p className="mt-1 text-xs text-red-400">{errors.startTime}</p>
                                )}
                            </div>

                            {/* Customer Name */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2">
                                    Your Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                                    <input
                                        type="text"
                                        value={formData.customerName}
                                        onChange={(e) => handleChange("customerName", e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                {errors.customerName && (
                                    <p className="mt-1 text-xs text-red-400">{errors.customerName}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="Enter your phone number"
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                                )}
                            </div>

                            {/* Submit Error */}
                            {errors.submit && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {errors.submit}
                                </div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 font-black text-lg rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "Confirm Booking"}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
