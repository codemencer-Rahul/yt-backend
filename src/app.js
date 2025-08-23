import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) // security

app.use(express.json({limit: "16kb"})) // api se jo bhi api json data bheja jayega, use server readable format me bna dega(js object).
app.use(express.urlencoded({extended: true, limit: "16kb"})) // form ka deta jo ki url-encoding hoke aata hai, use server readable bna deta hai by decoding.
app.use(express.static("public")) // jb bhi browser static files ko khoje, to server tum use public folder me khojo
app.use(cookieParser()) // remembers old request


// importing routes
import userRouter from "./routes/user.route.js"

app.use("/api/v1/users", userRouter)

export { app }