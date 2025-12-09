import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/users.model.js";
import connectDB from "../config/db.js";

dotenv.config();

const listUsers = async () => {
    try {
        await connectDB();
        const users = await User.find({});
        console.log("Total Users:", users.length);
        console.log(JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

listUsers();
