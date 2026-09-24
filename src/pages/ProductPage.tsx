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
    console.log(products)
  }, []);

  function addToCart(product: ProductResponse) {
    setCartItems((currentItems) => [...currentItems, product]);
    alert(`${product.name} har lagts i kundvagnen`);
  }

  return (
    <section>
      <h1>Produkter</h1>
      <button onClick={() => setShowCart(!showCart)}>
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>
      {showCart && <Cart items={cartItems} />}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={addToCart} />
      ))}
    </section>
  );
};
export default ProductPage;
