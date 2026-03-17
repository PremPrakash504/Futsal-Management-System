import express from "express";
import dotenv from "dotenv";
import authrouter from "./routes/authroutes.js";
import db from "./config/db.connect.js";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth",authrouter)

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