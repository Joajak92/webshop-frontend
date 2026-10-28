const API_URL = import.meta.env.VITE_API_URL;

export type CreatePaymentRequest = {
  amount: number;
  currency: string;
  customerEmail: string;
  description: string;
};

export type PaymentResponse = {
  orderId: number | null;
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
  message: string;
};

export async function createPayment(
  paymentRequest: CreatePaymentRequest,
): Promise<PaymentResponse> {
  const response = await fetch(`${API_URL}/payments/create-intent`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentRequest),
  });

  if (!response.ok) {
    throw new Error("Kunde inte starta betalningen");
  }

  return response.json() as Promise<PaymentResponse>;
}