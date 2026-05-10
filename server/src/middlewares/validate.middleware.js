import { ZodError } from "zod";
import AppError from "../errors/AppError.js";

export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.errors || error.issues || [];
      const messages = issues.map((e) => `${e.path ? e.path.join(".") : "field"}: ${e.message}`).join(", ");
      return next(new AppError(`Validation Error: ${messages || "Invalid input"}`, 400));
    }
    next(error);
  }
};
