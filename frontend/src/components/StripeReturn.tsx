//return component to go to after stripe checkout
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function StripeReturn() {
    const [status, setStatus] = useState('loading');
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id'); //get the session id from the url the sent by checkout

        //fetch the checkout session
        (async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/stripe/session?session_id=${sessionId}`);
            const data = await response.json();
            setStatus(data.status);
            setCustomerEmail(data.customerEmail);
        })()
        

    }, []);

    if (status === "open") {
        return (
            redirect('/')
        )
    }

    if (status === "complete") {
        return (
            <div>
                success or something lol.
            </div>
        )
    }
}