import express from "express";
import { 
  generateWebsite, 
  getAll, 
  deploy, 
  changes, 
  getWebsiteById, 
  getBySlug 
} from "../controllers/website.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { generateWebsiteSchema, updateWebsiteSchema } from "../validators/website.validator.js";
import { aiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Public routes
router.get("/get-by-slug/:slug", getBySlug);

// Protected routes
router.use(isAuth);
router.post("/generate", aiLimiter, validateRequest(generateWebsiteSchema), generateWebsite);
router.get("/get-all", getAll);
router.get("/deploy/:id", deploy);
router.post("/update/:id", aiLimiter, validateRequest(updateWebsiteSchema), changes);
router.get("/get-by-id/:id", getWebsiteById);

export default router;
