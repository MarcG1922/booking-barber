import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth.middleware.js";
import servicesRoutes from "./routes/services.routes.js";
import bookingsRoutes from "./routes/bookings.routes.js";

import { pool } from "./db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Barber Booking API running" });
});

app.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Private route accessed",
    user: req.user
  });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "DB connected successfully",
      time: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.use("/auth", authRoutes);
app.use("/services", servicesRoutes);
app.use("/bookings", bookingsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});