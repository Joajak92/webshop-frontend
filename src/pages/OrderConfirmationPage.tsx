import { Link } from "react-router";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-8 sm:py-20">
        <div className="mb-6 flex h-16 w-16 items-center justify-center border border-slate-400 bg-slate-50 text-2xl">
          ✓
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Orderbekräftelse
        </p>

        <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
          Tack för din order!
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-500">
          Din betalning har genomförts och vi har skickat en orderbekräftelse
          till din e-post.
        </p>

        <Link
          to="/products"
          className="mt-10 inline-flex items-center justify-center border border-slate-400 bg-slate-600 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-slate-500"
        >
          Tillbaka till produkterna
        </Link>
      </section>
    </div>
  );
}