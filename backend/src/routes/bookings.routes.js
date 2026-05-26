import express from "express";
import { pool } from "../db.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const { service_id, booking_date } = req.body;

    console.log("service_id:", service_id);
    console.log("booking_date:", booking_date);

    if (!service_id || !booking_date) {
      return res.status(400).json({
        error: "Missing fields"
      });
    }

    const normalizedDate = new Date(booking_date);
    normalizedDate.setSeconds(0, 0);

    const existing = await pool.query(
      `SELECT * FROM bookings
       WHERE booking_date >= $1
       AND booking_date < $1 + interval '1 hour'`,
      [normalizedDate]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        error: "This time slot is already booked"
      });
    }

    const result = await pool.query(
      `INSERT INTO bookings (user_id, service_id, booking_date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.user.id, service_id, normalizedDate]
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
        b.id,
        b.booking_date,
        b.status,
        s.name AS service_name,
        s.price,
        s.duration
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      WHERE b.user_id = $1
      ORDER BY b.booking_date ASC
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

router.get("/", authMiddleware, async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        b.id,
        b.booking_date,
        b.status,
        u.name AS user_name,
        s.name AS service_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN services s ON b.service_id = s.id
      ORDER BY b.booking_date ASC
      `
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

export default router;