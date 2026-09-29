import type { CartItem } from "../types/product-cart";

type CartProps = {
  items: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
};


function Cart({ items, onIncrease, onDecrease }: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);


if(items.length === 0) {
  return <p>Kundvagnen är tom</p>
}

 return (
  <section>
    <h2>Kundvagn</h2>

    {items.map((item) => {
      const lineTotal = item.price * item.quantity;

      return (
        <article key={item.id}>
          <h3>{item.name}</h3>

          <button onClick={() => onDecrease(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)}>+</button>
          <p>Radtotal: {lineTotal.toFixed(2)} kr</p>
        </article>
      );
    })}
    
    <strong>Totalt: {totalPrice.toFixed(2)} kr</strong>
  </section>
 );
}

export default Cart;
