import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const decode = jwt.decode(token);

    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Forbidden",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
