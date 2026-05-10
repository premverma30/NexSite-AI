import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000"),
  MONGODB_URL: z.string().url("Invalid MongoDB URL"),
  JWT_SECRET: z.string().min(10, "JWT_SECRET must be at least 10 characters long"),
  OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY is required"),
  FRONTEND_URL: z.string().url("Invalid FRONTEND_URL").default("http://localhost:5173"),
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z.string().optional()
});

export const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid Environment Variables:", error.format());
      process.exit(1);
    }
    throw error;
  }
};
