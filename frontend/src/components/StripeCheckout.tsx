import React, {useCallback, useEffect, useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

if (!process.env.REACT_APP_STRIPE_PUBLIC_KEY) {
    throw new Error('REACT_APP_STRIPE_PUBLIC_KEY is not set');
}
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function CheckoutForm() {
    const fetchClientSecret = useCallback(async () => {
        //create checkout session
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/stripe/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }
        )
        const data = await response.json();
        return data.clientSecret;
        
        
    }, []);
    
    const options = {fetchClientSecret}

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}> 
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}