import { userAgent } from "next/server";
import { CartItem } from "../../interface";

export default async function createStripeSession(
    cartItems: Array<CartItem>,
    token: String,
    uid: String,
    discountCode: String
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
                cartItems: cartItems,
                user: uid,
                discountCode: discountCode
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const responseJson = await response.json();
    console.log(responseJson);
    console.log(uid);
    return responseJson;
}
