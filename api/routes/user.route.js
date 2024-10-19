import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  deleteUser,
  getUsers,
  signout,
  updateUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
export default router;
