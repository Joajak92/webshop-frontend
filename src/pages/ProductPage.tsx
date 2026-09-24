import { useEffect, useState } from "react";
import type { ProductRequest } from "../types/ProductRequest";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState<ProductRequest[]>([]);
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
  }, []);

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
export default ProductPage;
