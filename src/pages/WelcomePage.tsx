import { useNavigate } from "react-router";
import { logout } from "../service/authService";


const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };



  return (
    <div className="min-h-screen bg-slate-400 p-6">
      <nav>
        <Link to="/products" className="text-pink-600">Produkter</Link>
      </nav>
      <h1 className="text-3x1 font-bold text-black">Välkommen {sessionStorage.getItem("subject")}!</h1>
      <p className="text-black">Welcome to the shop as {sessionStorage.getItem("roles")}</p>

      <button type="button" onClick={handleLogout} className="bg-pink-600 px-4 py-2 text-white">
        Log out
      </button>

    
    </div>
    
  );
};
export default WelcomePage;
