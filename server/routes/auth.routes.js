import express from "express"
import { googleAuth, logOut, getCurrentUser } from "../controllers/auth.controller.js"
import isAuth from "../middlewares/isAuth.js" 

const authRouter=express.Router()

authRouter.post("/google",googleAuth)
authRouter.get("/logout",logOut)
authRouter.get("/me", isAuth, getCurrentUser)

export default authRouter