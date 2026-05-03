import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    console.log("isAuth cookies:", req.cookies)
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("isAuth error:", error)
    return res.status(401).json({ message: "invalid token" });
  }
};

export default isAuth;
