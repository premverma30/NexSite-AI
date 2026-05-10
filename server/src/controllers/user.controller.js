import { asyncHandler } from "../utils/asyncHandler.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(200).json({ success: true, data: null });
  }
  
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
