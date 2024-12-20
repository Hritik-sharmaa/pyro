// ... existing imports ...
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  return (
    <div>
      <h1>Home</h1>
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
      )}
    </div>
  );
};
export default Home;
