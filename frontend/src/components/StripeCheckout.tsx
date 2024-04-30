"use client";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "../../interface";
import createStripeSession from "@/libs/createStripeSession";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { removeFromCart } from "@/app/redux/features/cartSlice";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default function StripeCheckout({
    cartItems,
    discountCode,
}: {
    cartItems: Array<CartItem>,
    discountCode: String,
}) {
    // const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();
    const makePayment = async () => {
        const stripe = await loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);
        const userData = await getUserProfile(session?.user.token as string);

        // if (cartItems.length > 3) {
        //     alert("You can only book 3 rooms at a time");
        //     return; // Exit the function early if the booking limit is exceeded
        // }

        if (!session) {
            return;
        }

        const stripeSession = await createStripeSession(cartItems, session.user.token, userData.data._id, discountCode);

        const result = stripe?.redirectToCheckout({
            sessionId: stripeSession.sessionId,
        });

        if ((await result)?.error) {
            console.log((await result)?.error);
        }

    };

    return (
        <button onClick={makePayment}>Check Out</button>
    );
}
