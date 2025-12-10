import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Changed to false for guest bookings
  },
  customerName: {
    type: String, // For guest bookings
    required: false,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

bookingSchema.index({ serviceId: 1, date: 1, startTime: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
