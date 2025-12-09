import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/users.model.js";
import connectDB from "../config/db.js";

dotenv.config();

const email = process.argv[2];

if (!email) {
    console.error("Please provide an email address: node scripts/make-admin.js <email>");
    process.exit(1);
}

const promoteUser = async () => {
    try {
        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = "admin";
        await user.save();

        console.log(`Success! User ${user.username} (${email}) is now an Admin.`);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

promoteUser();
