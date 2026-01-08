import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

// ✅ middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ test route
app.get("/db-test", async (req, res) => {
  try {
    const r = await pool.query("SELECT 1");
    res.json(r.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ✅ health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
