import type { ProductResponse } from "../types/ProductResponse";

type ProductCardProps = {
  product: ProductResponse;
  onAdd: (product: ProductResponse) => void;
};
function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
  <article className="flex h-full flex-col rounded border-2 border-slate-600 bg-slate-500 p-4 text-white">
    <h2 className="mb-2 text-xl font-bold">{product.name}</h2>
    <p className="mb-4 flex-1">{product.description}</p>
    <strong className="mb-4 block text-lg">{product.price} sek</strong>
    <button className="rounded bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2" type="button" onClick={() => onAdd(product)}>
      Lägg i kundvagnen
    </button>
  </article>
 );
}
export default ProductCard;
