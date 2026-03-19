import express from "express";
import { loginAdmin, signout, addVendor, addCompany, getVendor, getCompanyForAdmin, verifyToken, deleteCompany } from "../controller/auth.controller.js";
import { authorizesRoles } from "../middlewares/isAuth.js";
import { isSuperAdmin } from "../middlewares/login.js";


const authrouter = express.Router();


authrouter.post("/login", loginAdmin);
authrouter.post("/signout", signout);
authrouter.post("/addVendor", isSuperAdmin, authorizesRoles("super_admin"), addVendor);
authrouter.post("/addCompany",isSuperAdmin, authorizesRoles("super_admin"), addCompany);
authrouter.get("/getVendor/id/:id",isSuperAdmin, authorizesRoles("super_admin"),getVendor);
authrouter.get("/getcompany/id/:id",isSuperAdmin,authorizesRoles("super_admin"),getCompanyForAdmin);
authrouter.delete("/deleteCompany/id/:id",isSuperAdmin,authorizesRoles("super_admin"),deleteCompany);
authrouter.get("/verifyToken", verifyToken);
export default authrouter;