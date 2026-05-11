import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";
import AppError from "../errors/AppError.js";

class AuthService {
  async googleLogin(name, email, avatar) {
    let user = await userRepository.findByEmail(email);

    if (!user) {
      user = await userRepository.createUser({ name, email, avatar });
    }

    const token = this.generateToken(user._id);
    return { user, token };
  }

  generateToken(id) {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }

  getCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    };
  }

  getLogoutCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    };
  }
}

export default new AuthService();
