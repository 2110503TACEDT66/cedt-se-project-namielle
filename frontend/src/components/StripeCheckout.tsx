"use client"
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

export default function StripeCheckout() {
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51P41CKD7m7MeQAMy74Cvm7Up3wkvuBE53QspEcz6Okq4NW1lRsOdiEiBixPwqCtAljB8Ih9m3A3NhUCZ3LpH6GEL000EFHGT8G");

    const body = {
      product: "hi"
    }

    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch("http://localhost:5000/api/v1/stripe/create-checkout-session", {
      method: "POST",
      headers: headers,
      body : JSON.stringify(body)
    })

    const session = await response.json();

    const result = stripe?.redirectToCheckout({
      sessionId: session.id
    })

    if((await result)?.error){
      console.log((await result)?.error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={makePayment} >click</button>
    </main>
  );
}