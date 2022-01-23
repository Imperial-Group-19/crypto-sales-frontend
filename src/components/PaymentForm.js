import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";


export default function PaymentForm() {
    const [inputs, setInputs] = useState({
        customerWalletAddress: '',
        privateKey: '',
        merchantWalletAddress: '0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6',
        coinType:'Polygon (MATIC)',
        amount: Number(15.34),
        gasSpend: Number(0),
    });
    // const [customerWalletAddress, setCustomerWalletAddress] = useState('');
    // const [privateKey, setPrivateKey] = useState('');
    // const [merchantWalletAddress, setMerchantWalletAddress] = useState('');
    // const [amount, setAmount] = useState(15);
    // const [gasSpend, setGasSpend] = useState(0);
    const [totalAmount, setTotalAmount] = useState(Number(inputs.amount) + Number(inputs.gasSpend));


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value }));
        setTotalAmount(Number(this.amount + this.gasSpend));
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formcustomerWalletAddress">
                <Form.Label>Your Wallet Address</Form.Label>
                <Form.Control 
                    type="text"
                    name="customerWalletAddress"
                    placeholder="Enter wallet address" 
                    value={inputs.customerWalletAddress}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formprivateKey">
                <Form.Label>Your Private Key</Form.Label>
                <Form.Control 
                    type="text" 
                    name="privateKey"
                    placeholder="Enter private key"
                    value={inputs.privateKey}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formmerchantWalletAddress">
                <Form.Label>Merchant's Wallet Address</Form.Label>
                <Form.Control 
                    type="text" 
                    name="merchantWalletAddress"
                    placeholder="0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6" 
                    value="0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6"
                    disabled 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formmercoinType">
                <Form.Label>Coin</Form.Label>
                <Form.Control 
                    type="text"
                    name="coinType" 
                    placeholder="Polygon (MATIC)"
                    value={inputs.coinType}
                    disabled
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formamount">
                <Form.Label>Amount</Form.Label>
                <Form.Control 
                    type="number" 
                    name="amount"
                    value={inputs.amount}
                    disabled 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formgasSpend">
                <Form.Label>Gas Spend</Form.Label>
                <Form.Control 
                    type="number" 
                    name="gasSpend"
                    placeholder="Please enter your maximum gas spend"
                    value={inputs.gasSpend}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formtotalAmount">
                <Form.Label>Total Amount</Form.Label>
                <Form.Control 
                    type="number" 
                    name="totalAmount"
                    value={Number(inputs.amount) + Number(inputs.gasSpend)}
                    disabled
                    />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Pay
            </Button>

        </Form>
    );
};
