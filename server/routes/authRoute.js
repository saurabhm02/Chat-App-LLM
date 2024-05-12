import express from "express";
import { register, login, logout, setStatus } from "../controllers/authController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

//register new user
router.post("/register", register);

//login user
router.post("/login", login);

//log-out user
router.get("/logout", logout);

// change status

router.post("/setstatus", auth, setStatus);

export default router;
