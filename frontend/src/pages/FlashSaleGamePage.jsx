import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const FlashSaleGamePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalGames, setTotalGames] = useState(0);
  
    const gamesPerPage = 20;
  
    // Fetch games based on the current page
    const getFlashSaleGames = async (page) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/games/flash-sale`,
          {
            params: {
              page: page,
              limit: gamesPerPage,
            },
          }
        );
        setGames(response.data.games);
        setTotalGames(response.data.totalGames);
      } catch (err) {
        console.error("Error fetching the flash-sale games", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getFlashSaleGames(currentPage);
    }, [currentPage]);
  
    const totalPages = Math.ceil(totalGames / gamesPerPage);
  
    const handlePageClick = (page) => {
      setCurrentPage(page);
    };
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  return (
    <div className="px-20">
    <Navbar />
    <div className="pt-32">
      <h2 className="text-3xl font-bold text-center mb-6">flash sale Games</h2>

      {loading && <div className="text-center">Loading...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div key={game._id} className="game-card">
            <img
              src={game.poster || "/path/to/default/image.jpg"}
              alt={game.name}
              className="game-poster"
            />
            <h6 className="game-name">{game.name}</h6>
            <p className="game-rating">Rating: {game.discount}</p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination mt-6 flex justify-center space-x-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`px-4 py-2 text-white rounded-md ${
              currentPage === number ? "bg-blue-600" : "bg-blue-500"
            }`}>
            {number}
          </button>
        ))}
      </div>
    </div>
  </div>
  )
}

export default FlashSaleGamePage