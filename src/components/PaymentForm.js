import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";

import { ethers } from "ethers";
import Web3Modal from "web3modal";

// import BackendCommunication from "BackendCommunication";


export default function PaymentForm() {

    // <BackendCommunication /> // javascript to communicate with the backend (websocket)

    const [price, setPrice] = useState("0.0001");
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState()

    const [showModal, setShowModal] = useState(false);

    const contractAddress = "0xd617D99F40B254F4614F5B9cc0090Ca1383551a5";

    let navigate = useNavigate();
 
    const makePayment = async () => {
        // TODO: write function to fetch price of products from smart contract

        const funnelContract = new ethers.Contract(
            contractAddress,
            ['function makePayment(uint StoreId, uint productId ) external payable returns (bool)'],
            signer
        )

        const txInfo = {
            gasLimit: 250000,
            value: ethers.utils.parseEther(price)
        };

        try{
            setShowModal(true);
            const tx = await funnelContract.makePayment(0,0, txInfo);
    
            const receipt = await tx.wait(); 
            console.log('Transaction receipt');
            console.log(receipt);
    
            if(receipt) {
                // alert("Thank you for your purchase!")
                setShowModal(false);
                navigate("/confirmation")
            }

        } catch (error) {
            console.error(error);
            setShowModal(false);
            alert("Transaction failed :(")
        }

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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value }));
    }

    const handleConnectWallet = async()  => {
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        setAddress(connection.selectedAddress);
        setSigner(signer)
        setProvider(provider);
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
            <Button className='disconnect' variant="outline-danger" type="submit" onClick={handleDisconnectWallet}>Disconnect Wallet</Button>:
            <Button className='connect' variant="outline-success" type="submit" onClick={handleConnectWallet}>Connect Wallet</Button>}
            
            <hr></hr>
            
            <Form>
                <Form.Group className="mb-3" controlId="formcustomerWalletAddress">
                    <Form.Label>Your Wallet Address</Form.Label>
                    <Form.Control 
                        type="text"
                        name="customerWalletAddress"
                        placeholder="Wallet address" 
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
                        value={price}
                        disabled 
                    />
                </Form.Group>
                <Button variant="success" onClick={makePayment}>
                    Pay
                </Button>

            </Form>
            <Modal show={showModal} backdrop="static">
                <Modal.Body>Mining your transaction...</Modal.Body>
            </Modal>
        </>
    );
};
