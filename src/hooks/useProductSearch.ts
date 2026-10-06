import { useMemo, useState } from "react";
import type { ProductResponse } from "../types/ProductResponse";

export function useProductSearch(products: ProductResponse[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchedProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (search === "") {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search),
    );
  }, [products, searchTerm]);

  return { searchTerm, setSearchTerm, searchedProducts };
}
