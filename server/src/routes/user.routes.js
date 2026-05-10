import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.use(isAuth); // Protect all user routes
router.get("/current", getCurrentUser);

export default router;
