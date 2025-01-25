const express = require('express');
const { fetchGameDetails } = require('../controllers/game-controller');
const router = express.Router();

router.get("/:gameId", fetchGameDetails);

module.exports = router;