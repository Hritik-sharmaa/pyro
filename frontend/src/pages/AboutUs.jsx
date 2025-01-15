import React from "react";
import banner from "/AboutUsBanner.gif";
import Navbar from "../components/Navbar";
import "../styles/Common.css";
import { LuGamepad2 } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";
import { SiGamejolt } from "react-icons/si";
import Footer from "../components/Footer"

const AboutUs = () => {
  return (
    <div className="bg-[#0f1115] h-full font">
      <Navbar />
      <div className="flex justify-center items-center pt-36">
        <img src={banner} alt="" className="w-[85%] rounded-3xl" />
      </div>
      <div className="flex justify-center items-center flex-col py-24 px-20">
        <h2 className="text-5xl font-extrabold leading-tight text-white mb-6">
          THE ULTIMATE DESTINATION FOR GAMING ENTHUSIASTS
        </h2>
        <p className="text-gray-700 mb-6 text-xl px-20 leading-8">
          Welcome to Pyro, your one-stop platform for all things gaming! Whether
          you're looking for the latest PC games, exploring various genres, or
          creating a personalized wishlist, Pyro has got you covered. Our
          mission is to provide gamers with an unparalleled shopping experience
          by offering a reliable, scalable, and user-friendly platform. From
          detailed game descriptions to secure payment options, Pyro ensures you
          have everything you need to fuel your passion for gaming.
        </p>
        <button className="px-6 py-3 text-black bg-[#dcff1e] rounded-full font-medium hover:bg-[#a2b820] transition-all">
          Explore Pyro
        </button>
      </div>

      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-5xl font-extrabold text-white mb-12">
          EXPLORE MORE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          <div className="bg-[#04070c] p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <LuGamepad2 className="text-white w-24 h-24" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Exclusive Gaming Deals
            </h3>
            <p className="text-gray-700">
              Explore the hottest deals and exclusive discounts on top-rated PC
              games. From thrilling adventures to epic RPGs, Pyro brings you the
              best at unbeatable prices.
            </p>
            <a
              href="/deals"
              className="text-[#dcff1e] font-medium hover:underline mt-4 block">
              View Deals
            </a>
          </div>

          <div className="bg-[#04070c] p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <MdOutlineWorkOutline className="text-white w-24 h-24" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Join the Pyro Team
            </h3>
            <p className="text-gray-700">
              Be a part of our gaming revolution. If you’re passionate about
              games and want to help create the ultimate gaming store, we’re
              looking for you.
            </p>
            <a
              href="/careers"
              className="text-[#dcff1e] font-medium hover:underline mt-4 block">
              Explore Careers
            </a>
          </div>

          <div className="bg-[#04070c] p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <SiGamejolt className="text-white w-24 h-24" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Discover New Arrivals
            </h3>
            <p className="text-gray-700">
              Be the first to explore the latest games added to our store. From
              indie gems to blockbuster hits, we’ve got something new for every
              gamer.
            </p>
            <a
              href="/new-arrivals"
              className="text-[#dcff1e] font-medium hover:underline mt-4 block">
              Browse New Arrivals
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
