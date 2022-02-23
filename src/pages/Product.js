import React from "react";
import {Helmet} from "react-helmet";
import Header from "../components/Header";
import Headline from "../components/Headline";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Card, Button, Container, Row, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Product() {
    const params = useParams();
    const products = useSelector((state) => state.shop.products.filter(
        (product) => product.type !== "crosssell")
    );
    const currentProduct = products.find((product) => product.product_id === params.productID);

    return (
        <>
            <Helmet>
                <title>Landing Page - all products</title>
                <meta name="description" content="Product" />
            </Helmet>
            <Header />
            <Container>
                <Row>
                    <h1 className="display-1">
                        Having problems with C++?
                    </h1>
                </Row>
                <Row>
                    <p className="lead">
                        Try our new algorithms course. Now in C++!
                    </p>
                </Row>
                <Row>
                    <Card className="text-center" style={{display:'flex'}}>
                        <Card.Header>Limited time offer</Card.Header>
                        <Card.Body>
                            <Card.Title>{currentProduct.title}</Card.Title>
                            <Card.Text>
                            {currentProduct.description}
                            </Card.Text>
                            </Card.Body>
                            <ListGroup variant="flush">
                                {currentProduct.features.map((feature, index) => 
                                    (<ListGroupItem key={index}>{feature}</ListGroupItem>)
                                )}
                            </ListGroup>
                        <Card.Body>
                            <div className="d-grid gap-2">
                                <Button variant="success" size="lg">Buy Now</Button>
                                <Button variant="link" >Show me something cheaper</Button>
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    </Card>
                </Row>

            </Container>
            {/* <Headline /> */}
            
            
            
        </>
    );
};