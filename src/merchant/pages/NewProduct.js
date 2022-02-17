import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch } from "react-redux";
// import { createProduct } from "../features/merchantSlice";


export default function NewProduct() {
    const params = useParams();
    const store_id = params.storeID;
    const dispatch = useDispatch();

    const [newProduct, setNewProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
        features: [],
        store_id: params.storeID
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewProduct(values => ({...values, [name]: value }));
    };

    const createProduct = product => {

    }

    return (
        <>
            <MerchantHeader button="Logout" link="/logout"/>
            <Container>
                <Row>
                    <h1>Your new product</h1>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>    
                                <Form.Label>A unique identifier for your product</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="id"
                                    placeholder="digital-product"
                                    value={newProduct.id}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Title of product</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="name"
                                    placeholder="Ebook"
                                    value={newProduct.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Description of product</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="description"
                                    placeholder="Best prices for digital products in Imperial"
                                    value={newProduct.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Price in MATIC</Form.Label>
                                <Form.Control 
                                    type="number"
                                    name="wallet"
                                    placeholder="0.35"
                                    value={newProduct.price}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Product Feature</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="wallet"
                                    placeholder="Some feature"
                                    value={newProduct.features[0]}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Link to="/merchant/stores">
                                <Button variant="primary" onClick={() => dispatch(createProduct(newProduct))}>Create store</Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
            
        </>
    );
};