const express = require("express");
const router = express.Router();
const Game = require("../model/game");

router.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch games",
      error: err.message,
    });
  }
});


module.exports = router;