import { Link } from "react-router";
import type { User } from "../types/LoginResponse";

type WelcomePageProps = {
  user: User | null;
};

const WelcomePage = ({ user }: WelcomePageProps) => {
  return (
    <section className="flex bg-slate-50 text-slate-900 sm:min-h-[calc(100svh-8rem)]">
      <div className="mx-auto my-auto w-full max-w-3xl px-4 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <h1 className="break-words text-4xl font-bold tracking-tight sm:text-5xl">
          Välkommen, {user?.subject}!
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
          Upptäck vårt sortiment och hitta något som passar dig.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-flex rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-pink-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Utforska produkter
        </Link>
      </div>
    </section>
  );
};
export default WelcomePage;
