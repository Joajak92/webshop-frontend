import { useEffect, useState } from "react";
import type { ProductResponse } from "../types/ProductResponse";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import type { CartItem, Product } from "../types/Product-cart";
import { useCategoryFilter } from "../hooks/useCategoryFilter";
import CategoryFilter from "../components/CategoryFilter";
import { useProductSearch } from "../hooks/useProductSearch";
import ProductSearch from "../components/ProductSearch";

type ProductPageProps = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  onIncrease: (productId: number) => void;
  onDecrease: (prodictId: number) => void;
  onCheckout: () => Promise<void>;
};

const ProductPage = ({
  cartItems,
  addToCart,
  onIncrease,
  onDecrease,
  onCheckout,
}: ProductPageProps) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [showCart, setShowCart] = useState(false);

  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useCategoryFilter(products);

  const { searchTerm, setSearchTerm, searchedProducts } =
    useProductSearch(filteredProducts);

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

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ProductSearch value={searchTerm} onChange={setSearchTerm} />
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {showCart && (
          <div className="w-full max-w-md">
            <Cart
              items={cartItems}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onCheckout={onCheckout}
            />
          </div>
        )}
        <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {searchedProducts.length === 0 && searchTerm.trim() !== "" ? (
            <p className="col-span-full text-sm text-slate-500">
              Inga produkter hittades
            </p>
          ) : (
            searchedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
