import { Link } from "react-router";
import type { Product } from "../types/Product-cart";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};
function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-slate-400 bg-white text-left">
      <img
        src={product.imgUrl}
        alt={product.name}
        className="aspect-[4/3] w-full object-cover bg-slate-400"
      />

      <div className="flex flex-1 flex-col gap-2 border-t border-slate-400 p-4">
        <div className="flex items-center justify-between gap-4">
          <Link to={`/products/${product.id}`}>
            <h2 className="text-lg font-medium text-black underline hover:no-underline">
              {product.name}
            </h2>
          </Link>

          <span className="rounded-md border border-slate-400 px-3 py-1 text-sm text-black">
            {product.price} sek
          </span>
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-black px-4">
        {product.description}
      </p>

      <button
        type="button"
        onClick={() => onAdd(product)}
        className="mt-2 w-full bg-slate-600 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-slate-500"
      >
        Lägg i kundvagnen
      </button>
    </article>
  );
}
export default ProductCard;
