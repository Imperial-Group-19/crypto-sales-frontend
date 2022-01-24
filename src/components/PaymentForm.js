import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";

import Web3 from "web3";
import Web3Modal from "web3modal";
import funnelABI from "../config/abi/funnelContract.js";

// const funnelABI = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "storeId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "productId", "type": "uint256" } ], "name": "PaymentMade", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "storeId", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" } ], "name": "createProduct", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "storeId", "type": "uint256" }, { "internalType": "uint256", "name": "productId", "type": "uint256" } ], "name": "makePayment", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "storeAddress", "type": "address" } ], "name": "registerStore", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "storeAddresses", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "storeProductAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "storeProducts", "outputs": [ { "internalType": "uint256", "name": "productId", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "storeVolume", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "storeId", "type": "uint256" } ], "name": "totalProducts", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalStores", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ];



export default function PaymentForm() {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState("");

    const contractAddress = "0xd617D99F40B254F4614F5B9cc0090Ca1383551a5";
    const web3 = new Web3(Web3.givenProvider);
    const funnelContract = new web3.eth.Contract(funnelABI, contractAddress);

    const makePayment = async() => {
        // TODO: write function to fetch price of products from smart contract
        const price = 0.0001 * 10e18;
        let result = await funnelContract.methods.makePayment(0,0).send({
            value: price,
            from: address,
            gas: 50000
        }).on('confirmation', function(confirmationNumber, receipt) {
            console.log(confirmationNumber);
            console.log(receipt);
            alert("Thank you");
        })
    }
    


    const providerOptions = {
        // Injected providers
        injected: {
          display: {
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png",
            name: "Metamask",
            description: "Connect with the wallet in your browser"
          },
          package: null
        }
    };

    const web3modal = new Web3Modal({
        network: "mumbai",
        cacheProvider: "true",
        providerOptions
    });
    


    const [inputs, setInputs] = useState({
        customerWalletAddress: '',
        merchantWalletAddress: '0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6',
        coinType:'Polygon (MATIC)',
        amount: Number(15.34),
        gasSpend: Number(0),
    });
    // const [customerWalletAddress, setCustomerWalletAddress] = useState('');
    // const [merchantWalletAddress, setMerchantWalletAddress] = useState('');
    // const [amount, setAmount] = useState(15);



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value }));
    }

    const handleConnectWallet = async()  => {
        const connection = await web3modal.connect();
        const web3 = new Web3(connection);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setAddress(accounts[0]);
        setConnected(true);
    }

    const handleDisconnectWallet = async() => {
        const clear = web3modal.clearCachedProvider();
        setConnected(false);
        setAddress("");
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <>
            {connected? 
            <Button className='disconnect' variant="secondary" type="submit" onClick={handleDisconnectWallet}>Disconnect Wallet</Button>:
            <Button className='connect' variant="primary" type="submit" onClick={handleConnectWallet}>Connect Wallet</Button>}
            <Form>
                <Form.Group className="mb-3" controlId="formcustomerWalletAddress">
                    <Form.Label>Your Wallet Address</Form.Label>
                    <Form.Control 
                        type="text"
                        name="customerWalletAddress"
                        placeholder="Enter wallet address" 
                        value={address}
                        onChange={handleChange}
                        disabled
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
                <Button variant="primary" type="submit" onClick={makePayment}>
                    Pay
                </Button>

            </Form>
        </>
    );
};
