import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import path from "path"
import bodyParser from "body-parser"

// Routes
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"

// Initialize environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, ".env") })

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(
  cors({
    origin: "http://localhost:3001", // Frontend URL
    credentials: true,
  }),
)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

