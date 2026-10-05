import { Link } from "react-router";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-slate-400 p-6">
      <nav>
        <Link to="/products" className="text-pink-600">
          Produkter
        </Link>
      </nav>
      <h1 className="text-3x1 font-bold text-black">
        Välkommen {sessionStorage.getItem("subject")}!
      </h1>
      <p className="text-black">
        Welcome to the shop as {sessionStorage.getItem("roles")}
      </p>
    </div>
  );
};
export default WelcomePage;
