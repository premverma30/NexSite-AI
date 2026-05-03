import mongoose from "mongoose"

mongoose.connection.on("connected", () => {
    console.log("mongoose connected event: readyState", mongoose.connection.readyState)
})
mongoose.connection.on("error", (err) => {
    console.error("mongoose connection error event:", err)
})
mongoose.connection.on("disconnected", () => {
    console.warn("mongoose disconnected event")
})

const connectDb = async () => {
    const mongoUrl = process.env.MONGODB_URL

    if (!mongoUrl) {
        throw new Error("MONGODB_URL is not defined in environment variables")
    }

    try {
        await mongoose.connect(mongoUrl, {
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        })
        console.log("db connected 🚀", mongoose.connection.readyState)
    } catch (error) {
        console.error("❌ DB Connection Error:", error)
        throw error
    }
}

export default connectDb