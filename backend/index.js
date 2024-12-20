const express = require("express");
const { connectToDatabase } = require("./database/connectionDB");
require("dotenv").config();
const authRoutes = require("./routes/auth-route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json()); //middleware to parse json body
app.use(cookieParser());

//DB connection
connectToDatabase();

//middlewares
app.use("/api/auth", authRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


