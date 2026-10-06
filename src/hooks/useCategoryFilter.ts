import { useMemo, useState } from "react";
import type { ProductResponse } from "../types/ProductResponse";


export function useCategoryFilter (products: ProductResponse[]) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category))].sort(),
        [products],
    
    );

    const filteredProducts = useMemo(
        () => 
            selectedCategory === ""
        ? products
        : products.filter((p) => p.category === selectedCategory),
        [products, selectedCategory],
    );
    
    return {categories, selectedCategory, setSelectedCategory, filteredProducts};
    
}

