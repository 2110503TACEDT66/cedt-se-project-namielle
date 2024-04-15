import { userAgent } from "next/server";
import { CartItem } from "../../interface";

export default async function createStripeSession(
    cartItems: Array<CartItem>,
    token: String,
    uid: String
) {
    const response = await fetch(
        "http://localhost:5000/api/v1/stripe/create-checkout-session",
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                cartItems:cartItems,
                user: uid}),
        }
    );

    if (!response.ok) {
        throw new Error("POST Failed");
    }
    const responseJson = await response.json();
    console.log(responseJson);
    console.log(uid);
    return responseJson;
}
