import express from "express";
import {
  createService,
  getServices,
  deleteService,
} from "../controllers/services.controller.js";
import { verifyClerkToken, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public: Get all services
router.get("/", getServices);

// Protected: Admin only
router.post("/", verifyClerkToken, verifyAdmin, createService);
router.delete("/:id", verifyClerkToken, verifyAdmin, deleteService);

export default router;
