import type { ProductResponse } from "../types/ProductResponse";

type ProductCardProps = {
  product: ProductResponse;
};
function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>{product.price} sek</strong>
    </article>
  );
}
export default ProductCard;