const express = require("express");
const router = express.Router();
const Game = require("../model/game");

router.get("/:price", async (req, res) => {
    const price = parseInt(req.params.price, 10);
    try {
      const games = await Game.find({ discountedPrice: { $lt: price } }).limit(4);
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
