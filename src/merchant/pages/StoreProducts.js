import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";

export default function StoreProducts() {
    const params = useParams();
    const store = useSelector((state) => state.merchant.user.stores.find(store => store.id === params.storeID));

    return (
        <>
            <MerchantHeader button="Logout" link="/logout" />
            <Container>
                <h1>{store.name}</h1>

                <Container >
                    <Row className="m-3">
                        <Col>Title</Col>
                        <Col>Price</Col>
                        <Col></Col>
                    </Row>
                    {store.products.map(product => (
                                <Row id={product.id} className="m-3">
                                    <Col>{product.title}</Col>
                                    <Col>{product.price}</Col>
                                    <Col>
                                        <Link to={"/merchant/" + params.storeID + "/" + product.id}><Button>Edit Product</Button></Link>
                                    </Col>
                                </Row>

                    ))}
                </Container>
                <Card>
                    <Card.Body>
                        <Link to={"/merchant/" + params.storeID + "/new_product"}><Button variant="secondary">Add a new product</Button></Link>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};