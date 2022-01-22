import React from "react";
import ReactDOM from "react-dom";
import Form from "react-bootstrap";

// customerWalletAddress
// privateKey
// merchantWalletAddress
// coinType
// amount
// gasSpend


export default function PaymentForm() {
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formcustomerWalletAddress">
                <Form.Label>Your Wallet Address</Form.Label>
                <Form.Control type="text" placeholder="Enter wallet address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formprivateKey">
                <Form.Label>Your Private Key</Form.Label>
                <Form.Control type="text" placeholder="Enter private key" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formcustomerWalletAddress">
                <Form.Label>Merchant's Wallet Address</Form.Label>
                <Form.Control type="text" placeholder="0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6" />
            </Form.Group>

        </Form>
        // <form onSubmit={handleSubmit}>
        //     <label>Your Wallet address:
        //         <input 
        //             type="text" 
        //             name="customerWalletAddress"
        //             value={inputs.customerWalletAddress || ""}
        //             onChange={handleChange}
        //         />
        //     </label>
        //     <label>Private key:
        //         <input 
        //             type="text" 
        //             name="privateKey"
        //             value={inputs.privateKey || ""}
        //             onChange={handleChange}
        //         />
        //     </label>
        // </form>   
    );
};
