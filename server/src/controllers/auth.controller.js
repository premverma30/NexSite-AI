import authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const googleAuth = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;

  const { user, token } = await authService.googleLogin(name, email, avatar);

  res.cookie("token", token, authService.getCookieOptions());

  res.status(200).json({
    success: true,
    user,
  });
});

export const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("token", authService.getLogoutCookieOptions());

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
