import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";
import AppError from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userRepository.findById(decoded.id);

  if (!user) {
    return next(new AppError("The user belonging to this token does no longer exist.", 401));
  }

  req.user = user;
  next();
});

export default isAuth;
