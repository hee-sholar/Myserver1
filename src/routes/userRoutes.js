import express from "express";
import {requireAuth} from "../middleware/middlewares.js";
import {
  getUserById,
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/:id", requireAuth, getUserById);
userRouter.get("/get", getAllUsers);
userRouter.get("/email", getUserByEmail);
userRouter.post("/create", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
