"use client"
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "../../interface";
import createStripeSession from "@/libs/createStripeSession";

export default function StripeCheckout( {cartItems} : {cartItems: Array<CartItem>}) {
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51P41CKD7m7MeQAMy74Cvm7Up3wkvuBE53QspEcz6Okq4NW1lRsOdiEiBixPwqCtAljB8Ih9m3A3NhUCZ3LpH6GEL000EFHGT8G");

    const session = await createStripeSession({cartItems})

    const result = stripe?.redirectToCheckout({
      sessionId: session.id
    })

    if((await result)?.error){
      console.log((await result)?.error);
    }
  }

  return (
    <main className="flex h-auto flex-col items-center justify-between p-24">
      <button onClick={makePayment} >click</button>
    </main>
  );
}