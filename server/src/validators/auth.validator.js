import { z } from "zod";

export const googleAuthSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    avatar: z.string().url("Invalid avatar URL").optional().nullable().or(z.literal("")),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});
