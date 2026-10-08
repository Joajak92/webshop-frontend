import { useParams } from "react-router";
import type { Product } from "../types/Product-cart";
import { useEffect, useState } from "react";
import { getProductById } from "../service/productService";

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");

      const productId = Number(id);

      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch {
        setError("Produkten kunde inte hämtas.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  return (
    <div>
      <h1>This is a product detail page!</h1>
      <section>
        <article className="flex flex-col md:flex-row bg-white border rounded-lg shadow-md overflow-hidden">
          <div>
            <img
              src={product?.imgUrl}
              alt={product?.name}
              className="bg-slate-400 h-full w-full object-cover"
            />
          </div>
          <div className="p-6 md:w=1/2 flex flex-col justify-center">
            <h1 className="text-xl font-bold uppercase">{product?.name}</h1>
            <p className="mt-2">{product?.description}</p>
            <p className="mt-4">{product?.price} SEK</p>
          </div>
        </article>
      </section>
    </div>
  );
};
export default ProductDetailPage;
