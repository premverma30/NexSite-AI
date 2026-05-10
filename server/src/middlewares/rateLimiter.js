import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  max: 200, // 200 requests per 15 minutes per IP
  windowMs: 15 * 60 * 1000,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const aiLimiter = rateLimit({
  max: 20, // Max 20 generations per hour per IP
  windowMs: 60 * 60 * 1000,
  message: {
    success: false,
    message: "AI generation limit reached for this IP. Try again in an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
