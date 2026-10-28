import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

type Props = {
  onPaymentSuccess: () => void;
};

export default function StripePaymentForm({
  onPaymentSuccess,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "Betalningen misslyckades.");
      setLoading(false);
      return;
    }

    onPaymentSuccess();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <p
          role="alert"
          className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-slate-600 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Betalar..." : "Betala"}
      </button>
    </form>
  );
}