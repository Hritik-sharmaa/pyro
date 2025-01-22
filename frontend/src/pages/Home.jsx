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
import Loading from "../components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 100); 
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
        <Loading /> 
      ) : (
        <div>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} className="z-[999]" />
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
