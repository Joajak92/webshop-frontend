//import { getToken } from "./authService";
import type { CreateOrderRequest } from "../types/Order";


const ordersUrl = import.meta.env.VITE_GATEWAY_API_URL;

export const createOrder = async (order: CreateOrderRequest) => {
  const response = await fetch(ordersUrl + "/orders", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),

  });

  if (!response.ok) {
    throw new Error("Order misslyckas")
  }

  return response.json();

}