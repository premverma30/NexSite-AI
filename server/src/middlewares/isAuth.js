import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";
import AppError from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  
  if (!token) {
    console.log("🔒 [isAuth] No token found in cookies.");
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ [isAuth] Token verified for user ID:", decoded.id);
    
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      console.log("❌ [isAuth] User not found in database for verified token.");
      return next(new AppError("The user belonging to this token does no longer exist.", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("❌ [isAuth] JWT Verification Failed:", error.message);
    return next(new AppError("Invalid token. Please log in again!", 401));
  }
});

export default isAuth;
