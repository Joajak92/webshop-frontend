import type { ProductResponse } from "../types/ProductResponse";

type CartProps = {
  items: ProductResponse[];
};

function Cart({ items }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

 return (
  <section className="mx-4 my-6 rounded border-2 border-slate-600 bg-slate-500 p-4 text-white sm:mx-auto sm:max-w-xl">
    <h2 className="mb-4 text-2xl font-bold">Kundvagn</h2>
    {items.length === 0 ? (
      <p>Kundvagnen är tom.</p>
    ) : (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li className="border-b border-slate-400 py-2" key={`${item.id}-${index}`}>
            {item.name} - {item.price} sek
          </li>
        ))}
      </ul>
    )}
    <div className="mt-4 border-t-2 border-slate-400 pt-4 text-lg font-bold">Totalt: {total} sek</div>
  </section>
);
}

export default Cart;
