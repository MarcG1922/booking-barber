import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM services ORDER BY id ASC"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.post("/", async (req, res) => {
  try {

    const { name, duration, price } = req.body;

    const result = await pool.query(
      `INSERT INTO services
      (name, duration, price)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, duration, price]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

export default router;