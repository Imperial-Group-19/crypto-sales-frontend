import React from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";

// customerWalletAddress
// privateKey
// merchantWalletAddress
// coinType
// amount
// gasSpend


export default function PaymentForm() {
    // const [inputs, setInputs] = useState({});
    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value }))
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(inputs);
    // }

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
            <Form.Group className="mb-3" controlId="formmerchantWalletAddress">
                <Form.Label>Merchant's Wallet Address</Form.Label>
                <Form.Control type="text" placeholder="0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6" disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formmercoinType">
                <Form.Label>Coin</Form.Label>
                <Form.Control type="text" placeholder="Polygon (MATIC)" disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formamount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" placeholder="19.954382929" disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formgasSpend">
                <Form.Label>Gas Spend</Form.Label>
                <Form.Control type="text" placeholder="0.15" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formtotalAmount">
                <Form.Label>Total Amount</Form.Label>
                <Form.Control type="text" placeholder="0.15" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Pay
            </Button>

        </Form>
    );
};
