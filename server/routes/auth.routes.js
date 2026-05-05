import express from "express"
import { googleAuth, logOut, getCurrentUser } from "../controllers/auth.controller.js"

const authRouter=express.Router()

authRouter.post("/google",googleAuth)
authRouter.get("/logout",logOut)
authRouter.get("/me", getCurrentUser)

export default authRouter