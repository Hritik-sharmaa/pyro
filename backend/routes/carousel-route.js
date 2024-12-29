const express = require("express");
const Game = require("../model/game");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const randomGames = await Game.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(randomGames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
