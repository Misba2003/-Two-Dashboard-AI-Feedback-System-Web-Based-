import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import { analyzeReview } from "./llm.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware FIRST (order matters)
app.use(cors());
app.use(express.json());

// ✅ Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "success",
    message: "Backend running" 
  });
});

// ✅ Database test endpoint
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1 as test");
    res.json({ 
      status: "success",
      message: "Database connection successful",
      data: result.rows 
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ 
      status: "error",
      error: error.message 
    });
  }
});

// ✅ POST /api/review - Submit and analyze review
app.post("/api/review", async (req, res) => {
  try {
    const { rating, review } = req.body;

    // Validate rating (1-5)
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({
        status: "error",
        error: "Rating must be a number between 1 and 5"
      });
    }

    // Reject empty review
    if (!review || typeof review !== "string" || review.trim().length === 0) {
      return res.status(400).json({
        status: "error",
        error: "Review cannot be empty"
      });
    }

    // Call analyzeReview (handles LLM failures gracefully)
    let aiAnalysis;
    try {
      aiAnalysis = await analyzeReview(review.trim(), rating);
    } catch (llmError) {
      console.error("LLM analysis error:", llmError);
      // Continue with fallback response
      aiAnalysis = {
        user_response: review.trim(),
        summary: "Analysis unavailable",
        action: "neutral"
      };
    }

    // Insert into PostgreSQL
    const insertQuery = `
      INSERT INTO reviews (rating, review, ai_response, ai_summary, ai_action)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const insertResult = await pool.query(insertQuery, [
      rating,
      review.trim(),
      aiAnalysis.user_response || review.trim(),
      aiAnalysis.summary || "",
      aiAnalysis.action || "neutral"
    ]);

    // Return inserted row
    res.status(201).json({
      status: "success",
      data: insertResult.rows[0]
    });

  } catch (error) {
    console.error("POST /api/review error:", error);
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

// ✅ GET /api/reviews - Fetch all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reviews ORDER BY created_at DESC"
    );

    res.json({
      status: "success",
      data: result.rows
    });

  } catch (error) {
    console.error("GET /api/reviews error:", error);
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

// ✅ Error handling middleware (MUST be after all routes)
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: err.message 
  });
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/`);
  console.log(`✅ DB test: http://localhost:${PORT}/db-test`);
});

