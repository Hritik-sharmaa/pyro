const express = require("express");
const router = express.Router();
const Game = require("../model/game");

router.get("/", async (req, res) => {
  try {
    const flashGames = await Game.find({ discount: 30 }).limit(5);
    if (flashGames && flashGames.length > 0) {
      res.status(200).json(flashGames);
    } else {
      res.status(404).json({ message: "No games found in flash sale." });
    }
  } catch (err) {
    console.error("Error fetching the flash sale games: ", err);
    res.status(500).json({ message: "Fetching error" });
  }
});

module.exports = router;
