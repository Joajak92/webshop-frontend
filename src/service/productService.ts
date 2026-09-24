import type { ProductRequest } from "../types/ProductRequest";
import { getToken } from "./authService";

const productUrl =
  import.meta.env.VITE_AUTH_API_URL ?? "http://localhost:8080/products";

export async function getProducts(): Promise<ProductRequest[]> {
    const token = getToken();

    const response = await fetch(`${productUrl}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error("Kunde inte hämta produkter");
    }

    console.log("Servicerespons: " + response);
    return (await response.json()) as ProductRequest[];
    
}