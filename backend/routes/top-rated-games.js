const express = require("express");
const router = express.Router();
const Game = require("../model/game");

router.get("/", async (req, res) => {
  try {
    const topRatedGames = await Game.find({ rating: { $gt: 4 } })
      .sort({ rating: -1 })
      .limit(6);
    res.status(200).json(topRatedGames);
  } catch (err) {
    console.error("error fetching the top rated games: ", err);
    res.status(500).json({ error: "error fetching the games" });
  }
});

module.exports = router;
