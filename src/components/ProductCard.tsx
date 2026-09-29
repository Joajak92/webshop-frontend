import type { Product } from "../types/product-cart";


type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};
function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-slate-400 bg-white text-left">
      <div className="flex aspect-[4/3] items-center justify-center bg-slate-400 text-lg tracking-widest text-white">
        Bild?
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-slate-400 p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-black">{product.name}</h2>
          <span className="rounded-md border border-slate-400 px-3 py-1 text-sm text-black">
            {product.price} sek
          </span>
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-black px-4">
        {/* {product.description} */}
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
