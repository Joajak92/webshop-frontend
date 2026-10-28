import { useState } from "react";
import { Link } from "react-router";
import type { User } from "../types/LoginResponse";

type HeaderProps = {
  user: User | null;
  onLogout: () => Promise<void>;
};

const Header = ({ user, onLogout }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-600 p-4 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Webshop</h1>

        <button
          className="block sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <nav
        className={`mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:gap-6 sm:items-center ${!isOpen ? "hidden sm:flex" : "block sm:flex"}`}
      >
        <Link className="hover:text-slate-300" to="/">
          Hem
        </Link>

        <Link className="hover:text-slate-300" to="/products">
          Produkter
        </Link>

        {/* We apply sm:ml-auto to the first element of the "right-side" group */}
        {user?.roles.includes("ROLE_ADMIN") ? (
          <Link className="sm:ml-auto hover:text-slate-300" to="/admin">
            Admin
          </Link>
        ) : null}

        {user ? (
          <button
            type="button"
            onClick={onLogout}
            className={`bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 self-start sm:w-auto btn-sm ${!user?.roles.includes("ROLE_ADMIN") ? "sm:ml-auto" : ""}`}
          >
            Log out
          </button>
        ) : (
          <Link
            className={`hover:text-slate-300 sm:ml-auto" : ""}`}
            to="/login"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
