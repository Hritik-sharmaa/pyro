const express = require("express");
const { fetchUnder1000Games } = require("../controllers/game-controller");
const router = express.Router();

router.get("/under-price-1000", fetchUnder1000Games);

module.exports = router;
