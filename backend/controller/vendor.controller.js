import bcrypt from "bcryptjs";
import db from "../config/db.connect.js";
import jwt from "jsonwebtoken";

export const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }
    const [rows] = await db.execute(
      `SELECT v.*, c.name AS company_name
       FROM vendors v
       JOIN companies c ON v.company_id = c.id
       WHERE v.email = ?`,
      [email],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const vendor = rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, vendor.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: vendor.id,
        email: vendor.email,
        company_id: vendor.company_id,
        role: "vendor",
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      token,
      vendor: {
        id: vendor.id,
        username: vendor.username,
        email: vendor.email,
        company_id: vendor.company_id,
        company_name: vendor.company_name,
        package_type: vendor.package_type,
        role: "vendor",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const vendorsignout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "signout successful" });
  } catch (error) {
    res.status(400).json({ message: "server error", error });
  }
};

export const addMember = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const company_id = req.vendor.company_id;
    if ((!name || !phone, !email)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [existingMember] = await db.execute(
      "SELECT phone FROM members WHERE phone =?",
      [phone],
    );
    if (existingMember.length > 0) {
      return res.status(400).json({ message: "Member already exists" });
    }
    const [rows] = await db.execute(
      "INSERT INTO members (company_id, name, phone, email) VALUES (?,?,?,?)",
      [company_id, name, phone, email],
    );
    res.status(201).json({ message: "member added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMembers = async (req, res) =>{
  const company_id = req.vendor.company_id;
  const[rows] = await db.execute(
    "SELECT * FROM members WHERE comapny_id =? ",
    [company_id]
  );
  res.json(rows);
}