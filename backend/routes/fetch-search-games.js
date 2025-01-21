const express = require("express");
const { fetchSearchGames } = require("../controllers/game-controller");
const router = express.Router();

router.get("/search", fetchSearchGames);

module.exports = router;
