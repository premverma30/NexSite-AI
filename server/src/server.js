import "./config/loadEnv.js";
import { validateEnv } from "./config/env.js";
// Validate env vars before anything else
validateEnv();

import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";

// Handle Uncaught Exceptions globally
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(err.name, err.message, err.stack);
  process.exit(1);
});

const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB, {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    logger.info("DB connection successful! 🚀");
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});

// Handle Unhandled Rejections globally
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
