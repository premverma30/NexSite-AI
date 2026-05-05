import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.route.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

const app=express()

app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173"
app.use(cors({
    origin: frontendOrigin,
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)


app.listen(port,()=>{
    console.log("server started")
    connectDb()
})












// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()

// import connectDb from "./config/db.js"

// import authRouter from "./routes/auth.routes.js"
// import userRouter from "./routes/user.routes.js"
// import websiteRouter from "./routes/website.routes.js"
// import billingRouter from "./routes/billing.route.js"

// import cookieParser from "cookie-parser"
// import cors from "cors"
// import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

// const app = express()
// const port = process.env.PORT || 5000

// /* ---------------- IMPORTANT: Stripe webhook BEFORE JSON ---------------- */
// app.post(
//     "/api/stripe/webhook",
//     express.raw({ type: "application/json" }),
//     stripeWebhook
// )

// /* ---------------- CORS (FIXED) ---------------- */
// app.use(cors({
//     origin: "http://localhost:5173",   // ✅ hardcoded for safety
//     credentials: true
// }))

// /* ---------------- MIDDLEWARES ---------------- */
// app.use(express.json())
// app.use(cookieParser())

// /* ---------------- ROUTES ---------------- */
// app.use("/api/auth", authRouter)
// app.use("/api/user", userRouter)
// app.use("/api/website", websiteRouter)
// app.use("/api/billing", billingRouter)

// /* ---------------- SERVER START ---------------- */
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`)
//     connectDb()
// })