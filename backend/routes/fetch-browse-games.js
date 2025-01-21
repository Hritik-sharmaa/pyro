import { fetchBrowseGames } from "../controllers/game-controller";

const express = reqiure("express");
const router = express.Router();

router.get("/browse-games", fetchBrowseGames);

module.exports = router;
