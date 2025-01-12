const express = require("express");
const Game = require("../model/game");
const Wishlist = require("../model/wishlist");
const axios = require("axios");
const mongoose = require("mongoose");

//adding games to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { gameId } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(gameId)
    ) {
      return res.status(400).json({ message: "Invalid userId or gameId" });
    }
    const wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      // Check if the game is already in the wishlist
      const gameExists = wishlist.games.some(
        (g) => g._id.toString() === game._id.toString()
      );

      if (gameExists) {
        return res.status(400).json({ message: "Game already in wishlist" });
      }

      // Add game to the wishlist
      wishlist.games.push({ _id: game._id });
      await wishlist.save();
    } else {
      // Create a new wishlist if it doesn't exist
      const newWishlist = new Wishlist({
        userId,
        games: [{ _id: game._id }],
      });
      await newWishlist.save();
    }

    res.status(200).json({ message: "Game added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: error.message });
  }
};

//removing games from wishlist
const deleteFromWishlist = async (req, res) => {
  const { userId, gameId } = req.params; 

  if (!userId || !gameId) {
    return res.status(400).json({ message: "Invalid userId or gameId" });
  }

  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { games: { _id: gameId } } },
      { new: true }
    );

    if (!updatedWishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({
      message: "Game removed from wishlist",
      wishlist: updatedWishlist,
    });
  } catch (err) {
    console.error(`Error removing game (gameId: ${gameId}, userId: ${userId}): `, err);
    res.status(500).json({ error: "Failed to remove game from wishlist" });
  }
};


//fetching the wishlist items
const fetchWishlist = async (req, res) => {
  const { userId } = req.params;
  // const sortField = req.query.sort || "addedAt"; 
  // const sortOrder = req.query.order === "asc" ? 1 : -1; 

  // const sortOptions = {
  //   addedAt: { "games.addedAt": sortOrder },
  //   name: { "games._id.name": sortOrder },
  //   released: { "games._id.released": sortOrder },
  //   "lowest-price": { "games._id.discountedPrice": 1 },
  //   "highest-price": { "games._id.discountedPrice": -1 },
  // };

  // const sortBy = sortOptions[sortField] || sortOptions.addedAt;

  try {
    const wishlist = await Wishlist.findOne({ userId })
      .populate({
        path: "games._id",
        // options: { sort: sortBy }, // Apply sorting when populating
      })
      .exec();

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const games = wishlist.games.map(game => {
      const { _id, name, poster, released, discountedPrice, tags } = game._id; 
      const { addedAt } = game;
      return { _id, name, poster, released, discountedPrice, tags, addedAt };
    });

    res.status(200).json({games});
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

module.exports = { addToWishlist, deleteFromWishlist, fetchWishlist };
