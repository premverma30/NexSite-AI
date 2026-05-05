import mongoose from "mongoose"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


/* ---------------- GOOGLE AUTH ---------------- */
export const googleAuth = async (req, res) => {
    try {
        console.log("googleAuth start readyState", mongoose.connection.readyState)

        const { name, email, avatar } = req.body

        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }

        let user = await User.findOne({ email })
        console.log("googleAuth findOne returned", user)

        if (!user) {
            user = await User.create({ name, email, avatar })
            console.log("googleAuth created user", user._id)
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        // ✅ COOKIE (WORKS WITH FRONTEND SESSION)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,        
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        })

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.error("googleAuth error:", error)

        return res.status(500).json({
            message: `google auth error ${error}`
        })
    }
}


/* ---------------- LOGOUT ---------------- */
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: `log out error ${error}`
        })
    }
}


/* ---------------- GET CURRENT USER ---------------- */
// 🔥 IMPORTANT: Uses req.user from isAuth middleware
export const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        console.error("getCurrentUser error:", error)

        return res.status(500).json({
            message: "Server error"
        })
    }
}