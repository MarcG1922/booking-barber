import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { pool } from "./db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test básico
app.get("/", (req, res) => {
  res.json({ message: "Barber Booking API running 🚀" });
});

// Test conexión DB
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "DB connected ✅",
      time: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Routes
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});