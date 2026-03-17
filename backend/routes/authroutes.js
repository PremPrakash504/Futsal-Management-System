import express from "express";
import { loginAdmin } from "../controller/auth.controller.js";


const authrouter = express.Router();

authrouter.post("/login", loginAdmin);

export default authrouter;