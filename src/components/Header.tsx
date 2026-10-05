import { Link, useNavigate } from "react-router";
import { getToken, logout } from "../service/authService";
const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-slate-600 p-4 text-white sm:flex sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold">Webshop</h1>

      <nav className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:gap-6 items-center">
        <Link className="hover:text-slate-300" to="/">
          Hem
        </Link>

        <Link className="hover:text-slate-300" to="/products">
          Produkter
        </Link>

        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className="bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 self-start sm:w-auto btn-sm"
          >
            Log out
          </button>
        ) : (
          <Link className="hover:text-slate-300" to="/login">
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
