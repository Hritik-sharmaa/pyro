import { useAuthStore } from "../store/authStore";
import { FaArrowRight } from "react-icons/fa6";

import GameSlider from "../components/GameSlider";

import TopRatedGames from "../components/TopRatedGames";
import FlashSale from "../components/FlashSale";
import Banner from "../components/Banner";
import BrowseByGenre from "../components/BrowseByGenre";
import Navbar from "../components/Navbar";
import UnderPrice from "../components/UnderPrice";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="">
      {/* <header className="text-black text-center w-full h-[30px] flex items-center justify-center bg-white fixed top-0 left-0 right-0 z-40">
        <p className="flex items-center gap-2 text-sm">
          "Unleash the Gamer Within"
          <FaArrowRight className="text-[#F472FF]" />
        </p>
      </header> */}

      <Navbar />

      <GameSlider />

      <TopRatedGames />

      <BrowseByGenre />

      <FlashSale />

      <Banner />

      <UnderPrice/>

      <Footer/>
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
