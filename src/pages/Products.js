import React from "react";
import PaymentForm from "../components/PaymentForm";
import Header from "../components/Header";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, CardGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";

const Products = ({products}) => {
    const productList = products.map(product => {
        return(
            <Card key={product.title} style={{ width: '20rem' }} className="m-2" text="light" bg="secondary" border="light" >
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
                        <Button variant="outline-light" href="payment" size="lg">Buy Now</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    })

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
                                {productList}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products
})

export default connect(mapStateToProps)(Products)