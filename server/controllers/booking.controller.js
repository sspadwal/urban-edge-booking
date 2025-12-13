import Booking from "../models/bookings.model.js";
import Service from "../models/services.model.js";
import User from "../models/users.model.js";
import { clerkClient } from "../middleware/auth.middleware.js";
import { io } from "../server.js";
export const createBooking = async (req, res) => {
  try {
    const userId = req.auth?.userId; // Check if auth exists
    console.log("Creating booking. Authenticated User:", userId ? "Yes" : "No");

    const { serviceId, date, startTime, phone, customerName } = req.body;

    // Basic Validation
    if (!serviceId || !date || !startTime || !phone) {
      console.log("Missing common fields");
      return res.status(400).json({ message: "Service, Date, Time, and Phone are required" });
    }

    // Guest Validation: If not logged in, Name is required
    if (!userId && !customerName) {
      return res.status(400).json({ message: "Name is required for guest bookings" });
    }

    // Input Sanitization
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime)) {
      return res.status(400).json({ message: "Invalid time format" });
    }

    // Basic phone validation (digits, plus, spaces, dashes)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Validate past dates
    const bookingDateTime = new Date(`${date}T${startTime}`);
    if (bookingDateTime < new Date()) {
      return res.status(400).json({ message: "Cannot book appointments in the past" });
    }

    let user = null;
    let finalCustomerName = customerName;

    // If Authenticated: Fetch or Create User (Existing Logic)
    if (userId) {
      user = await User.findOne({ clerkId: userId });

      if (!user) {
        try {
          const clerkUser = await clerkClient.users.getUser(userId);
          const email = clerkUser.emailAddresses[0]?.emailAddress;
          const username = clerkUser.firstName || clerkUser.username || "Unknown";

          user = await User.create({
            clerkId: userId,
            username,
            email,
            phone,
            role: "user",
          });
        } catch (clerkError) {
          console.error("Error fetching user from Clerk:", clerkError);
          return res.status(500).json({ message: "Failed to fetch user details", error: clerkError.message });
        }
      }
    }

    // Fetch service to get duration
    const service = await Service.findById(serviceId);
    console.log("Service found:", service ? "Yes" : "No");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const duration = service.duration;

    // Convert startTime to minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const newStart = startHour * 60 + startMinute;
    const newEnd = newStart + duration;

    // Fetch bookings with same date
    const existingBookings = await Booking.find({ date });

    // Overlap check
    for (let booking of existingBookings) {
      const [exStartHour, exStartMin] = booking.startTime
        .split(":")
        .map(Number);
      const [exEndHour, exEndMin] = booking.endTime.split(":").map(Number);

      const existingStart = exStartHour * 60 + exStartMin;
      const existingEnd = exEndHour * 60 + exEndMin;

      if (newStart < existingEnd && newEnd > existingStart) {
        return res.status(400).json({
          message: "This time slot is already booked",
        });
      }
    }

    // Calculate endTime string
    const endHour = String(Math.floor(newEnd / 60)).padStart(2, "0");
    const endMin = String(newEnd % 60).padStart(2, "0");
    const endTime = `${endHour}:${endMin}`;

    // Create booking object
    const bookingData = {
      serviceId,
      date,
      startTime,
      endTime,
      phone,
      status: "pending",
    };

    if (user) {
      bookingData.userId = user._id; // Associate with user if logged in
    } else {
      bookingData.customerName = finalCustomerName; // Store name if guest
    }

    // Create booking
    const newBooking = await Booking.create(bookingData);

    // Notify admin
    console.log("Emitting newBooking event via Socket.io");
    io.emit("newBooking", {
      message: "New booking received!",
      booking: newBooking,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
      startTime,
      endTime,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({
      message: "New Booking Creation Failed",
      error: error.message,
    });
  }
};

export const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const bookings = await Booking.find({ date });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get bookings" });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res.status(400).json({ message: "ServiceId and Date required" });
    }

    // 1. Fetch service duration
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const duration = service.duration;

    // 2. Barber working hours (change if needed)
    const openTime = 8 * 60; // 08:00 → 480 minutes
    const closeTime = 18 * 60; // 18:00 → 1080 minutes

    // 3. Fetch all bookings for that date
    const bookings = await Booking.find({ date });

    // 4. Convert existing bookings to minutes for easier comparison
    const bookedSlots = bookings.map(b => {
      const [sH, sM] = b.startTime.split(":").map(Number);
      const [eH, eM] = b.endTime.split(":").map(Number);

      return {
        start: sH * 60 + sM,
        end: eH * 60 + eM,
      };
    });

    const availableSlots = [];

    // 5. Generate all possible slots
    for (let time = openTime; time + duration <= closeTime; time += 15) {
      const slotStart = time;
      const slotEnd = time + duration;

      // Check if slot overlaps any existing booking
      let isFree = true;

      for (let b of bookedSlots) {
        if (slotStart < b.end && slotEnd > b.start) {
          isFree = false;
          break;
        }
      }

      if (isFree) {
        // Convert back to HH:MM format
        const hour = String(Math.floor(slotStart / 60)).padStart(2, "0");
        const min = String(slotStart % 60).padStart(2, "0");
        availableSlots.push(`${hour}:${min}`);
      }
    }

    return res.status(200).json(availableSlots);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get slots", error: error.message });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "username email phone")
      .populate("serviceId", "name duration")
      .sort({ date: 1, startTime: 1 });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get bookings" });
  }
};
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update status" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookings = await Booking.find({ userId: user._id })
      .populate("serviceId", "name duration")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({ message: "Failed to get your bookings" });
  }
};

export const getGuestBookings = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(200).json([]);
    }

    const bookingIds = ids.split(",");
    const bookings = await Booking.find({ _id: { $in: bookingIds } })
      .populate("serviceId", "name duration")
      .sort({ date: 1, startTime: 1 });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching guest bookings:", error);
    return res.status(500).json({ message: "Failed to get guest bookings" });
  }
};
