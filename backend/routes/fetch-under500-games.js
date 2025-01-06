const express = require("express");
const { fetchUnder500Games } = require("../controllers/game-controller");
const router = express.Router();

router.get("/under-price-500", fetchUnder500Games);

module.exports = router;
