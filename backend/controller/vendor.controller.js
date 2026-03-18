import bcrypt from "bcryptjs";
import db from "../config/db.connect";
import jwt from "jsonwebtoken";

export const vendorLogin = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email, !password){
            return res.status(400).json({message:"Email and Password are required"});
        }
        const[rows] = await db.execute("SELECT* FROM vendors WHERE email=?",[email]);
        if(rows.length ===0){
            return res.status(404).json({message:"Vendor not found"});
        }
        const vendor =rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, vendor.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid password"});
        }
        const token = jwt.sign(
      { id: vendor.id,
         email: vendor.email, 
         company_id: vendor.company_id },
         process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRE }
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
        role: "vendor"
      },
    });

    } catch (error) {
      res.status(500).json({ message: error.message });  
    }
}


