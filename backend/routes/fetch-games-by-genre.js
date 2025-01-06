const express = require("express");
const router = express.Router();
const { fetchGamesByGenre } = require("../controllers/game-controller");

router.get("/genre/:genre", fetchGamesByGenre); 
module.exports = router;
