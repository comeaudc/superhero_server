// Imports
import express from "express";
import dotenv from "dotenv";
import { logReq, globalErr } from "./middleware/middlewares.js";
import connectDB from "./db/conn.js";
import characterRoutes from "./routes/characterRoutes.js";
import cors from "cors";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// Middleware
app.use(cors({ origin: "https://superhero-fe.onrender.com" })); // Allows sharing resources to all Servers
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
