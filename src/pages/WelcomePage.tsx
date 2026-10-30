import { Link } from "react-router";
import type { User } from "../types/LoginResponse";

type WelcomePageProps = {
  user: User | null;
};

const categories = [
  { icon: "🍝", name: "Mat & dryck" },
  { icon: "🛋️", name: "Inredning" },
  { icon: "🐶", name: "Djur" },
];

const WelcomePage = ({ user }: WelcomePageProps) => {
  return (
    <main className="min-h-[calc(100svh-8rem)] bg-gradient-to-br from-pink-100 via-white to-purple-100 text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          
          <h1 className="mt-6 break-words text-5xl font-black tracking-tight sm:text-5xl">
  ✨Välkommen {user?.subject}! 👋
</h1>

        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/products"
              className="group rounded-3xl bg-white/80 p-6 text-center shadow-md backdrop-blur transition hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="text-5xl transition group-hover:scale-110">
                {category.icon}
              </span>

              <h2 className="mt-4 font-bold text-slate-800">
                {category.name}
              </h2>

            </Link>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-slate-900 p-8 text-center text-white shadow-xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-300">
            Utvalt för dig
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Hitta din nästa favorit
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-slate-300">
            Bläddra bland våra produkter och hitta något som passar just dig.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-pink-100"
          >
            Utforska produkter →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;