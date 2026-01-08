import pkg from "pg";
import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config();

const { Pool } = pkg;

// Validate DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL environment variable is not set");
  process.exit(1);
}

// Create PostgreSQL connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Handle pool errors (log but don't crash server)
pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client:", err.message);
  // Don't exit - let the server continue and handle errors in routes
});

// Test connection on startup (non-blocking)
pool.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Database connection pool created successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection test failed:", err.message);
    console.log("⚠️  Server will continue, but DB operations may fail");
    // Don't exit - allow server to start even if DB is temporarily unavailable
  });
