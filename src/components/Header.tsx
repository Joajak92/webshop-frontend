import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-slate-600 p-4 text-white sm:flex sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold">Webshop</h1>

      <nav className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:gap-6">
        <Link className="hover:text-slate-300" to="/">
          Hem
        </Link>

        <Link className="hover:text-slate-300" to="/products">
          Produkter
        </Link>
      </nav>
    </header>
  );
};

export default Header;
