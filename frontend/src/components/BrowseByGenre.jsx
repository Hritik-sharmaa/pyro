import React from "react";
import action from "/action.webp";
import anime from "/anime.webp";
import casual from "/casual.webp";
import openWorld from "/exploration_open_world.webp";
import fighting from "/fighting_martial_arts.webp";
import free from "/freetoplay.webp";
import horror from "/horror.webp";
import rouge from "/rogue_like_rogue_lite.webp";
import sciFi from "/science_fiction.webp";
import sports from "/sports.webp";
import "../styles/Common.css";

const genres = [
  { name: "Action", image:  action } ,
  { name: "Anime", image:  anime } ,
  { name: "Casual", image:  casual } ,
  { name: "Open world", image:  openWorld },
  { name: "Fighting", image:  fighting  },
  { name: "Free", image:  free  },
  { name: "Horror", image:  horror  },
  { name: "Rouge", image:  rouge  },
  { name: "Sci-Fi", image:  sciFi  },
  { name: "Sports", image:  sports  },
];

const BrowseByGenre = () => {
  return (
    <div className="bg-[#0f1115] text-white px-20 py-10 font">
      <h2 className="text-4xl font-bold mb-7 font">Browse By Genre</h2>
      <div className="grid grid-cols-5 gap-4">
        {genres.map((genre) => (
          <div
            key={genre.name}
            className="relative group overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="object-cover w-full h-[7rem] group-hover:scale-110 transition-transform duration-300"
            />
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:translate-y-5"
              style={{
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
              }}
            >
              <span
                className="font-semibold text-lg  bg-[#66CC41] text-[#294700] rounded p-1 group-hover:text-lg transition-all duration-300"
                style={{
                  opacity: 1,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                {genre.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByGenre;

//opacity-0 group-hover:opacity-100 transition-opacity duration-300