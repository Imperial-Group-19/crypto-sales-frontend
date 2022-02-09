import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch } from "react-redux";
import { createStore } from "../features/merchantSlice";


export default function NewStore() {
    const dispatch = useDispatch();

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

    return (
        <>
            <MerchantHeader button="Logout" link="/logout"/>
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
                            <Link to="/merchant/stores">
                                <Button variant="primary" onClick={() => dispatch(createStore(newStore))}>Create store</Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
            
        </>
    );
};