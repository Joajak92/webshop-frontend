import { useNavigate } from "react-router";
import { logout } from "../service/authService";


const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };


  return (
    <div>
      <h1>Välkommen {sessionStorage.getItem("subject")}!</h1>
      <p>Welcome to the shop as {sessionStorage.getItem("roles")}</p>

      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};
export default WelcomePage;
