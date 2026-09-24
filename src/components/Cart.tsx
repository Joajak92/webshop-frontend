import type { ProductResponse } from "../types/ProductResponse";

type CartProps = {
  items: ProductResponse[];
};

function Cart({ items }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <section>
      <h2>Kundvagn</h2>
      {items.length === 0 ? (
        <p>Kundvagnen är tom.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              {item.name} - {item.price} sek
            </li>
          ))}
        </ul>
      )}
      <div>Totalt: {total} sek</div>
    </section>
  );
}

export default Cart;
