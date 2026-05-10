import { z } from "zod";

export const generateWebsiteSchema = z.object({
  body: z.object({
    prompt: z.string().min(10, "Prompt must be at least 10 characters").max(2000, "Prompt too long"),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const updateWebsiteSchema = z.object({
  body: z.object({
    prompt: z.string().min(5, "Prompt must be at least 5 characters").max(2000, "Prompt too long"),
  }),
  query: z.object({}).passthrough(),
  params: z.object({
    id: z.string().min(24).max(24), // Mongo ObjectId length
  }).passthrough(),
});
