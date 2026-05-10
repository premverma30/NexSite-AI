import express from "express";
import { billing } from "../controllers/billing.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.use(isAuth); // Protect all billing routes
router.post("/", billing);

export default router;
