import express from "express";
import {
  addMember,
  getMembers,
  deleteMember,
  updateMember,
  searchMember,
  vendorLogin,
  vendorsignout,
  getVendorProfile,
} from "../controller/vendor.controller.js";
import { isVendor } from "../middlewares/login.js";
import { authorizeVendor } from "../middlewares/isAuth.js";

const vendorrouter = express.Router();
vendorrouter.post("/vendorLogin", vendorLogin);
vendorrouter.post("/vendorsignout", vendorsignout);
vendorrouter.get("/getvendorprofile",isVendor,authorizeVendor("vendor"),getVendorProfile);
vendorrouter.post("/addMember", isVendor, authorizeVendor("vendor"), addMember);
vendorrouter.get("/getmember", isVendor, authorizeVendor("vendor"), getMembers);
vendorrouter.get("/searchmember", isVendor, authorizeVendor("vendor"), searchMember);
vendorrouter.delete(
  "/deletemember/id/:id",
  isVendor,
  authorizeVendor("vendor"),
  deleteMember,
);
vendorrouter.put("/updatemember/id/:id", isVendor, authorizeVendor("vendor"), updateMember);
export default vendorrouter;
