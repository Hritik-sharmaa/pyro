import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Common.css";
import { MdSort } from "react-icons/md";
import Footer from "../components/Footer";
import WishlistButton from "../components/WishlistButton";

const GenreGamesPage = () => {
  const { genre } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const [sortOption, setSortOption] = useState("relevance");

  const gamesPerPage = 20;

  // Fetch games by genre based on the current page
  const getGamesByGenre = async (page, sortField, order) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/games/genre/${genre}`,
        {
          params: {
            page: page,
            limit: gamesPerPage,
            sort: sortField,
            order,
          },
        }
      );
      setGames(response.data.games);
      setTotalGames(response.data.totalGames);
    } catch (err) {
      console.error("Error fetching games by genre", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGamesByGenre(currentPage, sortOption);
  }, [currentPage, genre, sortOption]);

  const totalPages = Math.ceil(totalGames / gamesPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-white bg-[#0f1115] w-full h-full px-20 font">
      <Navbar />
      <div className="pt-32">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-center mb-6">{genre} Games</h2>
          <div className="flex items-center">
            <MdSort size={30} className="mx-2" />
            Sort By
            <select
              className="ml-3 p-2 text-black rounded"
              value={sortOption}
              onChange={handleSortChange}>
              <option value="relevance">Relevance</option>
              <option value="name">Name</option>
              <option value="released">Release Date</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
            </select>
          </div>
        </div>

        {loading && <div className="text-center">Loading...</div>}

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {games.map((game) => (
            <div
              key={game._id}
              className="flex bg-white text-black p-2 rounded relative group">
              <img
                src={game.poster}
                alt={game.name}
                className="w-[21rem] rounded"
              />
              <div className="m-5">
                <h6 className="text-2xl font-bold">{game.name}</h6>
                <p className="text-xl">Rating: {game.rating}/5</p>
                <p>
                  Released:{" "}
                  {new Date(game.released).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h4>₹{game.discountedPrice.toLocaleString("en-IN")}</h4>
                <WishlistButton game={game} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="pagination mt-6 flex justify-center space-x-4 p-6">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-4 py-2 text-black font-bold rounded-md ${
                currentPage === number ? "bg-[#387a20]" : "bg-[#66CC41]"
              }`}>
              {number}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenreGamesPage;
