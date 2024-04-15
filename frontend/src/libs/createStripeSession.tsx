import { CartItem } from "../../interface";

export default async function createStripeSession(
    cartItems: Array<CartItem>,
    token: String
) {
    console.log(cartItems);
    const response = await fetch(
        "http://localhost:5000/api/v1/stripe/create-checkout-session",
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cartItems }),
        }
    );

    if (!response.ok) {
        throw new Error("POST Failed");
    }

    return await response.json();
}
