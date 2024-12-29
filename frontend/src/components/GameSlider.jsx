import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "../styles/Slider.css";

const GameSlider = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/carousel")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setGames(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (loading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  if (games.length === 0) {
    return (
      <div className="text-white text-center py-20">No games available</div>
    );
  }

  return (
    <div className="w-full h-full ">
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game._id} className="relative w-full h-[570px]">
            {/* {console.log(game.poster)}  */}
            <div
              className="absolute inset-0 bg-cover bg-center "
              style={{
                backgroundImage: `url(${game.poster})`,
                filter: "brightness(25%)",
              }}></div>

            <div className="absolute inset-0 flex flex-col items-start justify-center pl-10 text-white z-10">
              <h1 className="text-5xl font-extrabold mb-4">{game.name}</h1>
              <p className="mb-6 max-w-[700px]">
                {game.description?.length > 150
                  ? `${game.description.substring(0, 200)}...`
                  : game.description}
              </p>
              <div className="flex gap-4">
                <button className="bg-pink-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-pink-600">
                  Buy Now
                </button>
                <button className="border border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black">
                  + Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GameSlider;
