import React from "react";

const Payment = () => {
    return (
        <>
            <h1>Payment page</h1>
            <form>
                <label>Enter your name:
                    <input type="text" />
                </label>
            </form>
        </>
        
    );
};

export default Payment;

// user's crypto address ()
// seller's crypto address (unmodifiable field)
// coin (unmodifiable)
// amount (not modifiable)
// max gas spend