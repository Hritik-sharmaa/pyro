import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GamesDetails = () => {
  const { gameId } = useParams();
 // console.log("Game ID from URL:", gameId);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        //console.log(`Fetching game details for ID: ${gameId}`);
        const response = await axios.get(
          `http://localhost:3000/api/games/${gameId}`
        );
        //console.log("Fetched Game Details:", response.data);
        setGame(response.data);
      } catch (err) {
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    };
    fetchGameDetails();
  }, [gameId]);

  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="h-full bg-[#0f1115] text-white ">
      <Navbar />
      <div className="container mx-auto px-10 py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={game.poster}
            alt={game.name}
            className="w-full lg:w-1/3 rounded-lg shadow-lg"
          />

          <div className="lg:ml-10 mt-6 lg:mt-0">
            <h1 className="text-4xl font-extrabold">{game.name}</h1>
            <p className="text-gray-400 text-lg mt-3">{game.description}</p>

            <div className="mt-6">
              <p>
                <span className="font-bold">Release Date:</span>{" "}
                {new Date(game.released).toDateString()}
              </p>
              <p>
                <span className="font-bold">Publisher:</span>{" "}
                {game.publisher.join(", ")}
              </p>
              <p>
                <span className="font-bold">Genres:</span>{" "}
                {game.genres.join(", ")}
              </p>
              <p>
                <span className="font-bold">Rating:</span> {game.rating} ⭐
              </p>
              <p className="mt-3 text-lg">
                <span className="line-through">₹{game.originalPrice}</span>{" "}
                <span className="text-green-500 font-bold">
                  ₹{game.discountedPrice} ({game.discount}% OFF)
                </span>
              </p>
            </div>

            <button className="mt-6 bg-[#66CC41] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#387a20]">
              Buy Now
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Game Trailer</h2>
          <video className="w-full rounded-lg shadow-lg" controls>
            <source src={game.trailer} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {game.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="w-full rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GamesDetails;
