"use client"
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "../../interface";
import createStripeSession from "@/libs/createStripeSession";

export default function StripeCheckout( {cartItems} : {cartItems: Array<CartItem>}) {
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51P2sG5ISGle84u6wlpvUPjZTC5i5z2tXSVIUXFJEFxsV0uLWqvckp9qSoDTBSg2lwy1KktqRG86z95PYbkRAoJOa00wvzxXLiV");

    const session = await createStripeSession({cartItems})

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
