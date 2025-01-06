import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import VerificationEmail from "./pages/VerificationEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Games from "./pages/Games";
import TopRatedGamesPage from "./pages/TopRatedGamesPage";
import FlashSaleGamePage from "./pages/FlashSaleGamePage";
import Under500Games from "./pages/Under500Games";
import Under1000Games from "./pages/Under1000Games";
import GenreGamesPage from "./pages/GenreGamesPage";


function App() {

  return (
    <div>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerificationEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path = "/top-rated" element={<TopRatedGamesPage/>} />
          <Route path ="/flash-sale" element={<FlashSaleGamePage/>} />
          <Route path ="/under-price-500" element={<Under500Games/>} />
          <Route path ="/under-price-1000" element={<Under1000Games/>} />
          <Route path="/genre/:genre" element={<GenreGamesPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
