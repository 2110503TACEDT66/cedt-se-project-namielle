import { CartItem } from "../../interface";

export default async function createStripeSession({cartItems} : {cartItems: Array<CartItem>}) {
      const response = await fetch("http://localhost:5000/api/v1/stripe/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({cartItems})
      })
  
      const session = await response.json();
      return session;
  
  
}
