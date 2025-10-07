import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/auth.controller.js";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";

const router = new express.Router();

router.get("/authors", auth, isAdmin, getUsers);
router.get("/authors/:id", auth, isAdmin, getUser);
router.patch("/authors/:id", auth, isAdmin, updateUser);
router.delete("/authors/:id", auth, isAdmin, deleteUser);

export default router;
