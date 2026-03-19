import express from "express";
import dotenv from "dotenv";
import authrouter from "./routes/authroutes.js";
import db from "./config/db.connect.js";
import cookieParser from "cookie-parser";
import vendorrouter from "./routes/vendorroutes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authrouter)
app.use("/api/vendor",vendorrouter)
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.execute("SELECT 1");
    console.log("MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("MySQL connection failed", error.message);
  }
};

startServer();