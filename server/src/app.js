import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

import { globalLimiter } from "./middlewares/rateLimiter.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import AppError from "./errors/AppError.js";
import logger from "./utils/logger.js";

const app = express();

// 1. Security HTTP Headers
app.use(helmet());

// 2. CORS configuration
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
const allowedOrigins = [frontendOrigin, "http://127.0.0.1:5173", "http://localhost:5173"];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// 3. Rate Limiting (Global)
app.use("/api", globalLimiter);

// Stripe Webhook MUST be before express.json
// Note: We'll import stripeWebhook controller later in phase 2 when we do routes, 
// for now we'll leave a placeholder or map the exact existing controller.
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js";
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// 4. Body parser, reading data from body into req.body, limit to 10kb
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 5. Cookie parser
app.use(cookieParser());

// 6. Data sanitization against NoSQL query injection
// Disabled because express-mongo-sanitize crashes in Express 5 due to req.query being read-only.
// We rely on Zod validation instead for NoSQL injection prevention.

// 7. Request logging in dev
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// 8. Mount Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import websiteRouter from "./routes/website.routes.js";
import billingRouter from "./routes/billing.route.js";

import healthRouter from "./routes/health.routes.js";

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);
app.use("/api/billing", billingRouter);

// 9. Unhandled Routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 10. Global Error Handler
app.use(globalErrorHandler);

export default app;
