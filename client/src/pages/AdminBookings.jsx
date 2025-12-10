import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle, User, Phone, Scissors, Bell } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import io from "socket.io-client";

const AdminBookings = () => {
  const { getToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchBookings();

    // Socket connection
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("connect", () => {
      // console.log("Connected to socket server");
    });

    socket.on("newBooking", (data) => {
      showNotification(data.message, "success");
      fetchBookings(); // Refresh list
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      setBookings([]);
      showNotification("Failed to fetch bookings: Access Denied", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        showNotification(`Booking ${newStatus} successfully`, "success");
        fetchBookings();
      } else {
        showNotification("Failed to update booking status", "error");
      }
    } catch (error) {
      showNotification("Failed to update booking status", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
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

  const filteredBookings = bookings.filter((booking) => {
    if (!selectedDate) return true;
    const bookingDate = new Date(booking.date).toISOString().split("T")[0];
    return bookingDate === selectedDate;
  });

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-6xl my-12 mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Booking Management
            </h1>
            <p className="text-neutral-400">
              Review and manage customer appointments
            </p>
          </div>

          <div className="relative">
            <Bell className="w-6 h-6 text-neutral-400 hover:text-white transition-colors cursor-pointer" />
            {notification && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <Calendar className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ colorScheme: "dark" }}
              className="pl-11 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:border-amber-500/50 focus:bg-white/10 focus:outline-none transition-all cursor-pointer shadow-lg shadow-black/20 font-medium"
            />
          </div>
          <button
            onClick={fetchBookings}
            className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Refresh
          </button>
        </div>


        {/* Notification Toast */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${notification.type === "success"
              ? "bg-green-500/20 border-green-500/50 text-green-400"
              : "bg-red-500/20 border-red-500/50 text-red-400"
              }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
            <span className="font-bold">{notification.message}</span>
          </motion.div>
        )}

        {/* Bookings List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-neutral-400">
              Loading bookings...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 bg-neutral-900 rounded-2xl border border-white/10">
              No bookings found for this date
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                        <Scissors className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {booking.serviceId?.name || "Unknown Service"}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-[60px]">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <User className="w-4 h-4 text-neutral-500" />
                      <span>{booking.customerName || booking.userId?.username || "Unknown User"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Phone className="w-4 h-4 text-neutral-500" />
                      <span>{booking.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {booking.status === "pending" && (
                  <div className="flex items-center gap-3 pl-[60px] md:pl-0">
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "approved")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors font-bold text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "cancelled")}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors font-bold text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
