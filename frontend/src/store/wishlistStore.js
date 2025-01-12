import { create } from "zustand";

export const useWishlistStore = create((set) => ({
  userId: null,
  wishlist: [],

  setUserId: (userId) => set({ userId }),

  addToWishlist: (game) =>
    set((state) => ({
      wishlist: [...state.wishlist, game],
    })),

  removeFromWishlist: (gameId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((game) => game.id !== gameId),
    })),
}));


