import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";

import bookingRoutes from "./routes/bookings.routes.js";
import serviceRoutes from "./routes/services.routes.js";
import userRoutes from "./routes/users.routes.js";
import { getAvailableSlots } from "./controllers/booking.controller.js";
import { verifyClerkToken } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for debugging
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Public routes (no auth)
app.use("/api/services", serviceRoutes);
app.get("/api/bookings/available", getAvailableSlots); // Public endpoint for available slots

// Protected routes
app.use("/api/bookings", bookingRoutes);

// User routes (protected)
app.use("/api/users", verifyClerkToken, userRoutes);
app.get("/", (req, res) => {
  return res.send("Your Backend started");
});
connectDB();

const port = process.env.PORT || 5000;
httpServer.listen(port, "0.0.0.0", () =>
  console.log(`Server running on port ${port}`)
);
