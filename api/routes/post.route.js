import express from "express";
import {
  create,
  deletepost,
  getposts,
  updatepost,
} from "../controller/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const routes = express.Router();
routes.post("/create", verifyToken, create);
routes.get("/getposts", getposts);
routes.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
routes.put("/updatepost/:postId/:userId", verifyToken, updatepost);

export default routes;
