import React from "react";
import Header from "../components/Header";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/shopSlice";
import ShoppingCart from "../components/ShoppingCart";

export default function Products() {
    const products = useSelector((state) => state.shop.products)
    const addedProducts = useSelector((state) => state.shop.addedProducts)
    const dispatch = useDispatch()

    const productList = (products, addedProducts) => {
        return(
            <Row>
                <Col>
                    {products.map(product => (
                        <Card id = {product.id} key={product.id} style={{ width: '20rem' }} className="m-2" text="light" bg="secondary" border="light" >
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                {product.price} MATIC
                                </Card.Text>
                                <Card.Text>
                                {product.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                {product.features.map(feature => { return(<ListGroupItem key={feature}>{feature}</ListGroupItem>) })}
                            </ListGroup>
                            <Card.Body>
                                <div className="d-grid gap-2">
                                    {addedProducts.length === 0 || !addedProducts.find(added => added.id === product.id) ?
                                        <Button variant="outline-light" size="lg" onClick={() => dispatch(addToCart(product.id))}>Add To Cart</Button> :
                                        <Button variant="outline-dark" size="lg" onClick={() => dispatch(removeFromCart(product.id))}>Remove From Cart</Button>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
                
            </Row>
        )
    }

    return (
        <>
            <Header/>   
            <Container>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <h1 className="display-1">Our courses</h1>
                            </Row>
                            <Row>
                                {productList(products, addedProducts)}
                            </Row>
                        </Container>
                    </Col>
                    <Col xs={3}>
                        <ShoppingCart/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
