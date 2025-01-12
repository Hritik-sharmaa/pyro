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
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll("img");
      const promises = Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      );

      return Promise.all(promises);
    };

    const loadPage = async () => {
      await Promise.all([
        checkImagesLoaded(),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]);
      setIsLoading(false);
    };

    loadPage();
  }, []);

  return (
    <div className="">
      {/* <header className="text-black text-center w-full h-[30px] flex items-center justify-center bg-white fixed top-0 left-0 right-0 z-40">
        <p className="flex items-center gap-2 text-sm">
          "Unleash the Gamer Within"
          <FaArrowRight className="text-[#F472FF]" />
        </p>
      </header> */}

      <div className="">
        {isLoading ? (
          // Loader Screen
          <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
            <p className="text-white text-xl ml-4">Loading...</p>
          </div>
        ) : (
          // Main Content
          <div>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} className="z-[999]"/>
            <Navbar />
            <GameSlider />
            <TopRatedGames />
            <BrowseByGenre />
            <FlashSale />
            <Banner />
            <UnderPrice />
            <Footer />
          </div>
        )}
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
