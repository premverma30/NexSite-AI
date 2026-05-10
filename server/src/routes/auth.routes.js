import express from "express";
import { googleAuth, logOut, getCurrentUser } from "../controllers/auth.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { googleAuthSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/google", validateRequest(googleAuthSchema), googleAuth);
router.get("/logout", logOut);
router.get("/me", isAuth, getCurrentUser);

export default router;
