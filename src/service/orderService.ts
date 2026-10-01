import { getToken } from "./authService";
import type { CreateOrderRequest } from "../types/Order";


const ordersUrl = import.meta.env.VITE_ORDER_API_URL ?? "http://localhost:7500/orders";

export const createOrder = async (order: CreateOrderRequest) => {
const token = getToken();

  const response = await fetch(ordersUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),

  });

  if (!response.ok) {
    throw new Error("Order misslyckas")
  }

  return response.json();

}