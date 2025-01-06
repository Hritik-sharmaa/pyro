import React from "react";
import "../styles/Common.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import {Link } from "react-router-dom"

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setActive(!active);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <nav
        className={`flex items-center justify-between w-full h-[80px] bg-black px-20 text-white fixed left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          scrollingDown ? "-translate-y-full" : "translate-y-0"
        }`}>
        <div className="flex items-center gap-10">
          <Link to="/"><h1 className="text-3xl font-bold text-[#FF4438] logo">Pyro</h1></Link>
          <ul className="flex items-center gap-8 text-lg">
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer">
              Home
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 cursor-pointer">
              Browse
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer">
              About Us
            </motion.li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            onClick={toggleSearch}
            className={`relative ${active ? "text-[#DCFF1E]" : ""}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            <CiSearch size={24} />
          </motion.button>
          <div
            className={`${
              searchVisible ? "block" : "hidden"
            } absolute right-[20rem] rounded-full p-1 transition-all duration-300 ease-in-out`}>
            <input
              type="text"
              placeholder="Search..."
              className="w-[17rem] bg-transparent border border-zinc-700 outline-none p-2 pl-5 rounded-2xl"
            />
          </div>

          <motion.button
            className=""
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            <IoCartOutline size={24} />
          </motion.button>

          <motion.button
            className=""
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            <IoIosHeartEmpty size={24} />
          </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#DCFF1E] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#bad524]"
              onClick={() => navigate("/login")}>
              Login
            </motion.button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
