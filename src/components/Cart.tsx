import type { CartItem } from "../types/Product-cart";

type CartProps = {
  items: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onCheckout: () => void;
};


function Cart({ items, onIncrease, onDecrease, onCheckout }: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);


if (items.length === 0) {
    return (
      <section className="border border-slate-300 bg-white p-6 text-center shadow-sm">
        <h2 className="text-xl font-medium text-slate-800">Kundvagn</h2>
        <p className="mt-3 text-sm text-slate-500">Kundvagnen är tom</p>
      </section>
    );
  }

  return (
    <section className="border border-slate-300 bg-white p-6 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-xl font-medium tracking-tight text-slate-800">
          Kundvagn
        </h2>
        <span className="text-sm text-slate-500">
          {items.length} {items.length === 1 ? "vara" : "varor"}
        </span>
      </div>

      <div className="divide-y divide-slate-200">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;

          return (
            <article
              key={item.id}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-medium text-slate-800">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {item.price.toFixed(2)} kr/st
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center border border-slate-300">
                  <button
                    type="button"
                    aria-label={`Minska antal ${item.name}`}
                    onClick={() => onDecrease(item.id)}
                    className="px-3 py-1 text-lg text-slate-600 transition hover:bg-slate-100 hover:text-black"
                  >
                    −
                  </button>

                  <span
                    aria-label={`Antal ${item.name}`}
                    className="min-w-10 border-x border-slate-300 px-3 py-1 text-center text-sm text-slate-800"
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    aria-label={`Öka antal ${item.name}`}
                    onClick={() => onIncrease(item.id)}
                    className="px-3 py-1 text-lg text-slate-600 transition hover:bg-slate-100 hover:text-black"
                  >
                    +
                  </button>
                </div>

                <p className="min-w-24 text-right text-sm font-medium text-slate-800">
                  {lineTotal.toFixed(2)} kr
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-slate-300 pt-5">
        <strong className="text-base uppercase tracking-wider text-slate-700">
          Totalt
        </strong>
        <strong className="text-lg text-slate-900">
          {totalPrice.toFixed(2)} kr
        </strong>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 w-full bg-slate-600 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        Skicka beställning
      </button>
    </section>
  );
}

export default Cart;
