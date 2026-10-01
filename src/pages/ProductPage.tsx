import { useEffect, useState } from "react";
import type { ProductResponse } from "../types/ProductResponse";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import type { CartItem, Product } from "../types/Product-cart";
import { createOrder } from "../service/orderService";

const ProductPage = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [];
  });

  useEffect(() => {
    sessionStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );
}, [cartItems]);


const handleCheckout = async () => {
  if (cartItems.length === 0) {
    alert("Kundvagnen är tom")
    return;
  }
  const orderRequest = {
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };

  try {
    await createOrder(orderRequest);
    setCartItems([]);
    sessionStorage.removeItem("cart");
    alert("Ordern har skapats.");
  } catch {
    alert("Något gick fel när ordern skulle skapas");
  }
};

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      console.log(
        "Products: ",
        data.map((product) => product.name),
      );
      setProducts(data);
    }
    loadProducts();
    console.log(products);
  }, []);

  function addToCart(product: Product) {
    const index = cartItems.findIndex((item) => item.id === product.id);

    if(index === -1) {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      return;
    }

    const currentItem = cartItems[index];

    if(currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte fler produkter i lager");
      return;
    }

    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    setCartItems(updatedItems);


  }

function increaseQuantity(productId: number) {
const index = cartItems.findIndex(
    (item) => item.id === productId
  );

const currentItem = cartItems[index];

if(currentItem.quantity >= currentItem.stock) {
  alert("Det finns inte fler produkter i lager");
  return;
}

const updatedItems = [...cartItems];

updatedItems[index] = {
  ...currentItem,
  quantity: currentItem.quantity +1,
};

setCartItems(updatedItems);

}

function decreaseQuantity(productId: number) {
  const index = cartItems.findIndex((item) => item.id === productId);

  const currentItem = cartItems[index];
  const updatedItems = [...cartItems];

  if(currentItem.quantity === 1) {
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
    return;
  }

  updatedItems[index] = {
    ...currentItem,
    quantity: currentItem.quantity - 1,
  };

  setCartItems(updatedItems);


}



  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-8 sm:py-16">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
          Produkter
        </h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="text-xs uppercase tracking-[0.2em] text-slate-500 underline-offset-8 transition hover:text-black hover:underline"
        >
          {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
        </button>
        {showCart && (
          <div className="w-full max-w-md">
            <Cart 
            items={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onCheckout={handleCheckout}
            />
          </div>
        )}
        <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </main>
  );
}


export default ProductPage;


