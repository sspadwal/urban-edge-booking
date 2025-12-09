import { Clerk } from "@clerk/clerk-sdk-node";

export const clerkClient = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const verifyClerkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        try {
            // Verify the token with Clerk (with 60 second clock tolerance)
            const payload = await clerkClient.verifyToken(token, {
                clockSkewInMs: 60000, // Allow 60 seconds of clock skew
            });

            // Attach the verified session to the request
            req.auth = {
                userId: payload.sub,
                sessionId: payload.sid,
                ...payload
            };

            next();
        } catch (verifyError) {
            console.error("Token verification failed:", verifyError.message);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ message: "Authentication error" });
    }
};


export const verifyAdmin = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const User = (await import("../models/users.model.js")).default;
        const user = await User.findOne({ clerkId: req.auth.userId });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin rights required." });
        }

        next();
    } catch (error) {
        console.error("Admin verification error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
