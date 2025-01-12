const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  games: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
