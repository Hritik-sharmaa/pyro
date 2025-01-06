const express = require("express");
const router = express.Router();
const Game = require("../model/game");
const { fetchFlashSaleGames } = require("../controllers/game-controller");

router.get("/flash-sale", fetchFlashSaleGames);

module.exports = router;