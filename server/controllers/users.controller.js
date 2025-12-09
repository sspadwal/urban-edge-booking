import { users } from "@clerk/clerk-sdk-node";
import User from "../models/users.model.js";

export const registerUser = async (req, res) => {
  try {
    const clerkUser = await users.getUser(req.auth.userId);

    const newUser = await User.findOneAndUpdate(
      { clerkId: clerkUser.id },
      {
        clerkId: clerkUser.id,
        username: clerkUser.username || clerkUser.firstName || "Unknown",
        email: clerkUser.emailAddresses[0].emailAddress,
        phone: clerkUser.phoneNumbers?.[0]?.phoneNumber || "",
      },
      { new: true, upsert: true }
    );

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
};
