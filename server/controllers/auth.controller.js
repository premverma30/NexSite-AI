import mongoose from "mongoose"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

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

        // ✅ FIXED COOKIE SETTINGS (IMPORTANT)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,        // local dev
            sameSite: "lax",      // MUST match everywhere
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        })

        return res.status(200).json(user)

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
        // ✅ FIXED COOKIE CLEAR (must match login settings)
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })

        return res.status(200).json({
            message: "log out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: `log out error ${error}`
        })
    }
}


/* ---------------- GET CURRENT USER ---------------- */
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json(user)

    } catch (error) {
        console.error("getCurrentUser error:", error)

        return res.status(401).json({
            message: "Invalid token"
        })
    }
}