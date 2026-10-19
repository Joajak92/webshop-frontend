import { Link } from "react-router";
import type { User } from "../types/LoginResponse";

type WelcomePageProps = {
  user: User | null;
};

const WelcomePage = ({ user }: WelcomePageProps) => {
  return (
    <div className="min-h-screen bg-slate-400 p-6">
      <nav>
        <Link to="/products" className="text-pink-600">
          Produkter
        </Link>
      </nav>
      <h1 className="text-3x1 font-bold text-black">
        Välkommen {user?.subject}!
      </h1>
      <p className="text-black">
        Welcome to the shop as {user?.roles.join(", ")}
      </p>
    </div>
  );
};
export default WelcomePage;
