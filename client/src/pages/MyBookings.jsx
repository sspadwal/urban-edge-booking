import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Scissors, MapPin, Phone } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const MyBookings = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);

    if (activeTab === "upcoming") {
      return bookingDate >= today;
    } else {
      return bookingDate < today;
    }
  });

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchBookings();
    }
  }, [isLoaded, isSignedIn]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "cancelled":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
        <div className="text-neutral-400">Please sign in to view your bookings</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-30 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">My Bookings</h1>
          <p className="text-neutral-400">Track your past and upcoming appointments</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === "upcoming" ? "text-amber-500" : "text-neutral-400 hover:text-white"
              }`}
          >
            Upcoming
            {activeTab === "upcoming" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === "history" ? "text-amber-500" : "text-neutral-400 hover:text-white"
              }`}
          >
            History
            {activeTab === "history" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
              />
            )}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-neutral-400">
            Loading your bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900 rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {activeTab === "upcoming" ? "No Upcoming Bookings" : "No Booking History"}
            </h3>
            <p className="text-neutral-400 mb-6">
              {activeTab === "upcoming"
                ? "You have no upcoming appointments scheduled."
                : "You haven't completed any appointments yet."}
            </p>
            {activeTab === "upcoming" && (
              <a
                href="/#book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-neutral-900 font-bold rounded-full hover:bg-amber-400 transition-colors"
              >
                Book Now
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Scissors className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {booking.serviceId?.name || "Service"}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.startTime} - {booking.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
