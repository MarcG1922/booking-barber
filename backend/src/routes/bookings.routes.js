import express from "express";

import { pool } from "../db.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {

    const { service_id, booking_date } = req.body;

    const result = await pool.query(
      `INSERT INTO bookings
      (user_id, service_id, booking_date)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [
        req.user.id,
        service_id,
        booking_date
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        bookings.id,
        bookings.booking_date,
        bookings.status,
        services.name AS service_name,
        services.price
      FROM bookings
      JOIN services
      ON bookings.service_id = services.id
      WHERE bookings.user_id = $1
      ORDER BY bookings.booking_date ASC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

export default router;