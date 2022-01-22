import React from "react";
import PaymentForm from "../components/PaymentForm";

const Payment = () => {
    return (
        <>
            <h1>Payment page</h1>
            <PaymentForm />
        </>
        
    );
};

export default Payment;

// user's crypto address ()
// seller's crypto address (unmodifiable field)
// coin (unmodifiable)
// amount (not modifiable)
// max gas spend