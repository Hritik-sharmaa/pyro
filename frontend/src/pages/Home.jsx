import "../styles/Common.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import GameSlider from "../components/GameSlider";
import { useState } from "react";

const Home = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setActive(!active)
  };
  return (
    <div className="">
      <header className="text-black text-center w-full h-[40px] flex items-center justify-center">
        <p className="flex items-center gap-2 text-sm">
          "Unleash the Gamer Within"
          <FaArrowRight className="text-[#F472FF]" />
        </p>
      </header>

      <nav className="flex items-center justify-between w-full h-[80px] bg-black px-10 text-white relative">
        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-bold text-[#F472FF] logo">Pyro</h1>
          <ul className="flex items-center gap-8 text-lg">
            <li className="cursor-pointer">Home</li>
            <li className="flex items-center gap-1 cursor-pointer">
              Browse
            </li>
            <li className="cursor-pointer">About Us</li>
          </ul>
        </div>

        <div className="flex items-center gap-6 ">
          <button onClick={toggleSearch} className={`relative ${active ? "text-[#DCFF1E]" : ""}`}>
            <CiSearch size={24} />
          </button>
          <div
            className={`${
              searchVisible ? "block" : "hidden"
            } absolute right-[230px] rounded-full p-1 transition-all duration-300 ease-in-out`}>
            <input
              type="text"
              placeholder="Search..."
              className="rounded-3xl w-[17rem] bg-transparent border border-b outline-none p-2 pl-5"
            />
          </div>

          <button className="">
            <IoCartOutline size={24} />
          </button>
          <button
            className="bg-[#DCFF1E] text-black font-semibold px-4 py-2 rounded-md"
            onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>

      <div>
        <GameSlider />
      </div>
    </div>
  );
};
export default Home;

// const { isAuthenticated, logout } = useAuthStore();
// const handleLogout = async () => {
//   try {
//     await logout();
//     navigate("/login");
//   } catch (error) {
//     console.error("Failed to logout:", error);
//   }
// };

{
  /* <h1>Home</h1>
      {!isAuthenticated ? (
        <button
          className="bg-black text-white p-2 rounded-lg hover:bg-zinc-900 transition duration-200 cursor-pointer"
          onClick={() => navigate("/login")}>
          Login
        </button>
      ) : (
        <button
          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
          onClick={handleLogout}>
          Logout
        </button>
      )} */
}
