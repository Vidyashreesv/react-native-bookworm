import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";

dotenv.config({ path: "./src/.env" });
const app = express();
const PORT = process.env.PORT || 4090;
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  connectDB();
});
//opensll rand -base64 32
