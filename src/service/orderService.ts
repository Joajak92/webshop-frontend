import { getToken } from "./authService";


const ordersUrl =
import.meta.env.VITE_ORDER_API_URL ?? "http://localhost:7500/orders";

export async function getOrders() {
    const response = await fetch(ordersUrl, {
        headers: {
            Authorization: `Bearer ${getToken()}`

        }
    });

    console.log("Status:", response.status);

    if(!response.ok) {
        throw new Error(`Kunde inte hämta ordrar (status ${response.status})`);
    }

    return response.json();
}