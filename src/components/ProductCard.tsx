import type { ProductResponse } from "../types/ProductResponse";

type ProductCardProps = {
  product: ProductResponse;
  onAdd: (product: ProductResponse) => void;
};
function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>{product.price} sek</strong>
      <button type="button" onClick={() => onAdd(product)}>
        Lägg i kundvagnen
      </button>
    </article>
  );
}
export default ProductCard;
