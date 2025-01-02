import React from "react";
import img1 from "/randomGames.webp";
import "../styles/Common.css";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="px-32 py-10 bg-[#0f1115] font">
      <motion.div
        className="relative text-white h-[15rem] overflow-hidden rounded-lg"
        whileHover={{ scale: 1.04 }}>
        <div className="absolute inset-0 w-full h-full">
          <img
            src={img1}
            alt=""
            className="object-cover w-full h-full brightness-[0.2] rounded-lg"
          />
        </div>
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-[3.5rem]">
          <h1 className="text-4xl font-bold mb-4">Best Of 2023</h1>
          <p className="text-xl">
            A look back at the year's top sellers, best new releases,
            most-played games, and more!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
