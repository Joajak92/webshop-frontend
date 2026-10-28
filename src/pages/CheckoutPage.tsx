import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router";
import type { CartItem } from "../types/Product-cart";
import { createPayment } from "../service/paymentService";
import StripePaymentForm from "../components/StripePaymentForm";

type Props = {
  cartItems: CartItem[];
  onOrderCreated: () => void;
};

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
);

export default function CheckoutPage({
  cartItems,
  onOrderCreated,
}: Props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Din varukorg är tom.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
        const payment = await createPayment({
  amount: total,
  currency: "sek",
  customerEmail: form.email,
  description: "Order från webshop",
});
      setClientSecret(payment.clientSecret);
    } catch (error) {
      console.error("Kunde inte starta betalningen:", error);
      setError("Något gick fel när betalningen skulle startas.");
    } finally {
      setLoading(false);
    }
  }

  function handlePaymentSuccess() {
    onOrderCreated();
    navigate("/order-confirmation");
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black">
        <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-8">
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            Kassa
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Din varukorg är tom.
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-8 bg-slate-600 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-slate-500"
          >
            Till produkterna
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="mb-10">

          <h1 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
            Slutför ditt köp
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            Fyll i dina uppgifter och fortsätt sedan till den säkra
            betalningen.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="border border-slate-400 bg-white p-6 sm:p-8">
            {!clientSecret ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium">
                    Leveransuppgifter
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Ange uppgifterna som ska användas för leveransen.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium"
                    >
                      Namn
                    </label>

                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ditt namn"
                      required
                      className="w-full border border-slate-400 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium"
                    >
                      E-post
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="du@exempel.se"
                      required
                      className="w-full border border-slate-400 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium"
                    >
                      Adress
                    </label>

                    <input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Din leveransadress"
                      required
                      className="w-full border border-slate-400 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-700"
                    />
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-600 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Startar betalning..." : "Gå till betalning"}
                </button>
              </form>
            ) : (
              <section>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
                  Betalning
                </p>

                <h2 className="mt-3 text-2xl font-light">
                  Betala säkert
                </h2>

                <p className="mb-8 mt-3 text-sm leading-relaxed text-slate-500">
                  Fyll i dina kortuppgifter för att slutföra köpet.
                </p>

                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#475569",
                        borderRadius: "0px",
                      },
                    },
                  }}
                >
                  <StripePaymentForm
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </section>
            )}
          </div>

          <aside className="h-fit border border-slate-400 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-medium">Din order</h2>

            <div className="mt-6 divide-y divide-slate-300">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Antal: {item.quantity}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-sm">
                    {(item.price * item.quantity).toFixed(2)} kr
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-400 pt-6">
              <span className="text-sm text-slate-500">Totalt</span>

              <strong className="text-lg">
                {total.toFixed(2)} kr
              </strong>
            </div>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-6 w-full border border-slate-400 py-3 text-xs uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-600 hover:text-black"
            >
              Tillbaka till produkter
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}