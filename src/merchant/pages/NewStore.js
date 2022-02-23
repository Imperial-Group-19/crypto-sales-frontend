import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch } from "react-redux";
// import { createStore } from "../features/merchantSlice";
import { useNavigate } from "react-router-dom";

import { useWeb3Context } from "../features/Web3Context";

import ConnectButton from "../../components/ConnectButton";


export default function NewStore() {

    const [showModal, setShowModal] = useState(false);

    const { address, contract } = useWeb3Context();

    const dispatch = useDispatch();

    let navigate = useNavigate();


    const [newStore, setNewStore] = useState({
        id: '',
        name: '',
        description: '',
        wallet: '',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewStore(values => ({...values, [name]: value }));
    };

    const createStore = async (storeAddress) => {
        try{
            setShowModal(true);
            
            const tx = await contract.registerStore(newStore.wallet);
            const receipt = await tx.wait(); 
            console.log('Transaction receipt');
            console.log(receipt);
    
            if(receipt) {
                // alert("Thank you for your purchase!")
                setShowModal(false);
                navigate(`/merchant/${newStore.wallet}/new-product`)
            }
    
        } catch (error) {
            console.error(error);
            setShowModal(false);
            alert("Transaction failed :(")
        }
    }


    return (
        <>
            <MerchantHeader button="Logout" link="/logout"/>
            {!address ? (
            <ConnectButton />
            ) : (
            <Container>
                <Row>
                    <h1>Your new store</h1>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>    
                                <Form.Label>A unique identifier for your store</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="id"
                                    placeholder="digital-products-store"
                                    value={newStore.id}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Name of store</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="name"
                                    placeholder="Imperial Digital Products Store"
                                    value={newStore.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Description of store</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="description"
                                    placeholder="Best prices for digital products in Imperial"
                                    value={newStore.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Store Wallet</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="wallet"
                                    placeholder="Please input your store's MATIC Wallet address"
                                    value={newStore.wallet}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={() => createStore(newStore)}>Create store</Button>
                        </Form>
                    </Col>
                </Row>
                <Modal show={showModal} backdrop="static">
                    <Modal.Body>Creating your store...</Modal.Body>
                </Modal>
                
            </Container>
            
            )}
        </>
    );
};