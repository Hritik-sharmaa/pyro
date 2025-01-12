const express = require("express");
const {
  addToWishlist,
  deleteFromWishlist,
  fetchWishlist,
} = require("../controllers/wishlist-controller");
const router = express.Router();

router.post("/add/:userId", addToWishlist);
router.delete("/remove/:userId/:gameId", deleteFromWishlist);
router.get("/:userId", fetchWishlist);

module.exports = router;
