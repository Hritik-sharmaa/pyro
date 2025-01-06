const express = require("express");
const router = express.Router();
const {fetchTopRatedGames} = require("../controllers/game-controller");

router.get("/top-rated", fetchTopRatedGames);

module.exports = router;