require("dotenv").config();
console.log("GOOGLE_CALLBACK_URL =", process.env.GOOGLE_CALLBACK_URL);
console.log("GOOGLE CLIENT ID =", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE CALLBACK =", process.env.GOOGLE_CALLBACK_URL);
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const passport = require("./config/passport");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Passport
app.use(passport.initialize());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});