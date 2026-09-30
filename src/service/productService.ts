import type { ProductRequest } from "../types/ProductRequest";
import type { ProductResponse } from "../types/ProductResponse";
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

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkter");
  }
  return (await response.json()) as ProductRequest[];
}

export async function addProduct(
  product: ProductRequest,
): Promise<ProductResponse> {
  const response = await fetch(productUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Produkt kunde inte skapas.");
  }

  const responseText = await response.text();
  const result = (await JSON.parse(responseText)) as ProductResponse;
  return result;
}
