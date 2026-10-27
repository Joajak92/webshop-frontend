import type { ProductRequest } from "../types/ProductRequest";
import type { ProductResponse } from "../types/ProductResponse";

const productUrl = import.meta.env.VITE_GATEWAY_API_URL;



export async function getProducts(): Promise<ProductResponse[]> {
  const response = await fetch(`${productUrl}/products`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkter");
  }
  return (await response.json()) as ProductResponse[];
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const response = await fetch(`${productUrl}/products/${id}`, {
    method: "GET",
    credentials: "include",
    });

  if (!response.ok) {
    throw new Error("Produkten kunde inte hämtas");
  }
  return (await response.json()) as ProductResponse;
}

export async function addProduct(
  product: ProductRequest,
): Promise<ProductResponse> {
  const response = await fetch(`${productUrl}/add-products`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Produkt kunde inte skapas.");
  }

  return (await response.json() as ProductResponse)
}
