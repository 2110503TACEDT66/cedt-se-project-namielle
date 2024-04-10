//component for the stripe checkout form
import React, {useCallback} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

// if (!process.env.REACT_APP_STRIPE_PUBLIC_KEY) {
//     throw new Error('REACT_APP_STRIPE_PUBLIC_KEY is not set');
// }
const stripePromise = loadStripe("pk_test_51P41CKD7m7MeQAMy74Cvm7Up3wkvuBE53QspEcz6Okq4NW1lRsOdiEiBixPwqCtAljB8Ih9m3A3NhUCZ3LpH6GEL000EFHGT8G");

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