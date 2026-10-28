import { Link } from "react-router";
import type { User } from "../types/LoginResponse";

type HeaderProps = {
  user: User | null;
  onLogout: () => Promise<void>;
};

const Header = ({ user, onLogout }: HeaderProps) => {
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

        {user?.roles.includes("ROLE_ADMIN") ? (
          <Link to="/admin">Admin</Link>
        ) : (
          <></>
        )}

        {user ? (
          <button
            type="button"
            onClick={onLogout}
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
