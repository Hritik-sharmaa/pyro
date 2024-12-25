const express = require("express");
const { connectToDatabase } = require("./database/connectionDB");
require("dotenv").config();
const authRoutes = require("./routes/auth-route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./utils/passport-config");

//games initailization
const { fetchAndStoregame } = require("./controllers/game-controller");
const gameRoute = require("./routes/game-route");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); //middleware to parse json body
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//DB connection
connectToDatabase();

//fetch and store games
fetchAndStoregame();

//middlewares
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
