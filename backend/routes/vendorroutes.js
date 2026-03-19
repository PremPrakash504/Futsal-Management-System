import express from "express";
import { addMember, vendorLogin, vendorsignout } from "../controller/vendor.controller.js";
import { isVendor } from "../middlewares/login.js";
import { authorizesRoles, authorizeVendor } from "../middlewares/isAuth.js";

const vendorrouter = express.Router();
vendorrouter.post("/vendorLogin", vendorLogin);
vendorrouter.post("/vendorsignout", vendorsignout);
vendorrouter.post("/addMember",isVendor,authorizeVendor("vendor"),addMember);
vendorrouter.get("/getmember",isVendor,authorizesRoles("vendor"));
export default vendorrouter; 