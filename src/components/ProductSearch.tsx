type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const ProductSearch = ({ value, onChange }: ProductSearchProps) => (
  <>
    <label htmlFor="product-search" className="sr-only">
      Sök produkter
    </label>
    <input
      id="product-search"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Sök produkter"
      className="w-56 border-b border-slate-300 bg-transparent px-2 py-1 text-xs tracking-[0.2em] text-slate-500 placeholder:uppercase focus:outline-none"

    />
  </>
);

export default ProductSearch;
