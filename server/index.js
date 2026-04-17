require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ── Middleware ──
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ]
}));
app.use(express.json());

// ── Routes ──
app.use("/api/surveys",   require("./routes/surveys"));
app.use("/api/responses", require("./routes/responses"));
app.use('/api/results',   require('./routes/responses'));

// ── Test route ──
app.get("/", (req, res) => {
  res.send("SurveyFlow API is running ✅");
});

// ── Start server FIRST, then connect MongoDB ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// ── Connect MongoDB ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));