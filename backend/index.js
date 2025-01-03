const express = require("express");
const path = require("path");
const { connectToDatabase } = require("./database/connectionDB");
require("dotenv").config();
const authRoutes = require("./routes/auth-route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./utils/passport-config");
const carouselRoute = require("./routes/carousel-route");
const { fetchAndStoregame } = require("./controllers/game-controller");
const gameRoute = require("./routes/game-route");
const topRatedGames = require("./routes/top-rated-games")
const flashSale = require("./routes/flash-sale-games")
const underGames = require("./routes/under-games")

const app = express();

const assetsPath = path.join(__dirname, "../assets");
app.use("/assets", express.static(assetsPath));

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
//fetchAndStoregame();

//middlewares
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoute);
app.use("/api/carousel", carouselRoute);
app.use("/api/top-rated", topRatedGames);
app.use("/api/flash-sale", flashSale);
app.use("/api/games/under-price",underGames);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
