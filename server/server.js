import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cvRouter from "./routes/cvRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.pelagopass.com"]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow requests like Postman or server-to-server
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// COOP and COEP headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // Allows COOP
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp"); // Allows COEP
  next();
});

// API First endpoint
app.get("/", (req, res) => res.send("API successfully working."));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cv", cvRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
