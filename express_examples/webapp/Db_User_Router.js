import express from "express";
import { User } from "./data/db.js";

const UserRouter = express.Router();

UserRouter.get("/api/v1/ems/users", async (req, res) => {
    // #swagger.security = [{"bearerAuth": [] }]
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

UserRouter.get("/api/v1/ems/users/:id", async (req, res) => {
    // #swagger.security = [{"bearerAuth": [] }]
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default UserRouter;