import React, { useState } from "react";
import {Helmet} from "react-helmet";
import Header from "../components/Header";
import Headline from "../components/Headline";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Card, Button, Container, Row, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { addToCart } from "../features/shopSlice";

export default function Product() {
    const params = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.shop.products.filter(
        (product) => product.type !== "crosssell")
    );
    const currentProduct = products.find((product) => product.product_id === params.productID);
    const upsellProduct = products.find((product) => product.type === "upsell");
    const downsellProduct = products.find((product) => product.type === "downsell");
    const mainProduct = products.find((product) => product.type === "main");
    
    // Hook for displaying modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
        
    const handleOpen = () => {
        if (currentProduct.type === "main") {
            setShow(true);
        }
    }
    
    return (
        <>
            <Helmet>
                <title>Landing Page - all products</title>
                <meta name="description" content="Product" />
            </Helmet>
            <Header />
            <Container style={{ width: "60%" }}>
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
                            <Card.Text>
                                {currentProduct.price + " MATIC"}
                            </Card.Text>
                            <div className="d-grid gap-2">
                                {currentProduct.type === "main" ? 
                                    <Button variant="success" size="lg" onClick={handleOpen}>Buy Now</Button> :
                                    <Link to={"/" + params.storeID + "/products/"}>
                                        <Button variant="success" size="lg" onClick={() => dispatch(addToCart(currentProduct.product_id))}>Buy Now</Button>
                                    </Link>
                                }
                                {currentProduct.type === "downsell" ?
                                    null : currentProduct.type === "upsell" ?
                                    <Link to={"/" + params.storeID + "/products"}>
                                        <Button variant="link" onClick={() => dispatch(addToCart(mainProduct.product_id))} >Not interested, check out for {mainProduct.title} instead</Button>
                                    </Link> :
                                    <Link to={"/" + params.storeID + "/products/" + downsellProduct.product_id}>
                                        <Button variant="link" >Show me something cheaper</Button>
                                    </Link>
                                }
                                
                            </div>
                        </Card.Body>
                        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                    </Card>
                </Row>

            </Container>
            {/* <Headline /> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Special Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>Since you're interested in our C++ course, we have a special offer for you!</Modal.Body>
                <Modal.Footer>
                    <Link to={"/" + params.storeID + "/products/" + upsellProduct.product_id}>
                        <Button variant="primary" onClick={handleClose}>
                            Show me more!
                        </Button>
                    </Link>
                    <Link to={"/" + params.storeID + "/products/"}>
                        <Button variant="link" onClick={() => dispatch(addToCart(currentProduct.product_id))}>
                            I'm not interested
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
            
            
            
        </>
    );
};