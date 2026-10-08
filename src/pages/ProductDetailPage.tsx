import { useParams } from "react-router";
import type { Product } from "../types/Product-cart";
import { useEffect, useState } from "react";
import { getProductById } from "../service/productService";

type ProductDetailPageProps = {
  addToCart: (product: Product) => void;
};

const ProductDetailPage = ({ addToCart }: ProductDetailPageProps) => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState("");

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
      <section className="m-10">
        <article className="flex flex-col md:flex-row bg-white border rounded-lg shadow-md overflow-hidden">
          <div className="md:w-1/2">
            <img
              src={product?.imgUrl}
              alt={product?.name}
              className="bg-slate-400 h-full w-full object-cover"
            />
          </div>
          <div className="p-6 w=1/2 flex flex-col justify-center ">
            <h1 className="text-xl font-bold uppercase">{product?.name}</h1>
            <p className="mt-2">{product?.description}</p>
            <p className="mt-4">{product?.price} SEK</p>
          </div>
        </article>

        <button
          type="button"
          onClick={() => {
            if (product) addToCart(product);
          }}
          disabled={!product || product.stock === 0}
          className="mt-2 w-full bg-slate-600 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-slate-500"
        >
          Lägg i kundvagnen
        </button>
      </section>
    </div>
  );
};
export default ProductDetailPage;
