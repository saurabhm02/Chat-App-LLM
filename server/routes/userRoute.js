import express from "express";
import {
  getUser,
  profilePhotoUpdate,
  profileUpdate,
  getUserByEmail,
  searchUsers,
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/user-auth", auth, (req, res) => {
  return res.status(200).send({ ok: true });
});
router.get("/get-user/:userId", auth, getUser);

router.post("/update-profile/:id", auth, profileUpdate);

router.post("/update-profile-photo/:id", auth, profilePhotoUpdate);

router.get("/get-user-email/:email", auth, getUserByEmail);

router.get("/search-users/:query", auth, searchUsers);

export default router;
