// Imports
import express from "express";
import dotenv from "dotenv";
import { logReq, globalErr } from "./middleware/middlewares.js";
import connectDB from "./db/conn.js";
import characterRoutes from "./routes/characterRoutes.js";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // how long open period
  limit: 100,
  message: "Too many requests, please try again later",
});

// Middleware
app.use(
  cors({
    origin: ["https://superhero-fe.onrender.com", "http://localhost:5173"],
    credentials: true, // Allow the req.header AND req.body through. w/o would only allow the req.body
  }),
); // Allows sharing resources to all Servers

app.use(limiter);
app.use(express.json());
app.use(logReq);

// Routes http://localhost:3000/api/char
app.use("/api/char", characterRoutes);

// Global Err
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
