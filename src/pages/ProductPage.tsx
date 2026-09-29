import { useEffect, useState } from "react";
import type { ProductResponse } from "../types/ProductResponse";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

const ProductPage = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [cartItems, setCartItems] = useState<ProductResponse[]>([]);
  const [showCart, setShowCart] = useState(false);
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

  function addToCart(product: ProductResponse) {
    setCartItems((currentItems) => [...currentItems, product]);
    alert(`${product.name} har lagts i kundvagnen`);
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
            <Cart items={cartItems} />
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
};
export default ProductPage;
