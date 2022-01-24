import React from "react";
import PaymentForm from "../components/PaymentForm";
import Header from "../components/Header";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, CardGroup, Button } from "react-bootstrap";

export default function Products() {
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
                                <Card style={{ width: '18rem' }} className="m-2" bg="warning" border="light" >
                                    {/* <Card.Img variant="top" src="https://picsum.photos/180/100" /> */}
                                    <Card.Body>
                                        <Card.Title>Algorithms in C++</Card.Title>
                                        <Card.Text>
                                        35 MATIC
                                        </Card.Text>
                                        <Card.Text>
                                        Try out our original course in C++ and impress your interviewers.
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Full Algorithms Course in C++</ListGroupItem>
                                        <ListGroupItem>Pointers Cheat Sheet</ListGroupItem>
                                        <ListGroupItem>Memory Management Tips</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                        <Button variant="outline-dark" href="payment">Buy Now</Button>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem' }} className="m-2" bg="warning" border="light">
                                    {/* <Card.Img variant="top" src="https://picsum.photos/180/100" /> */}
                                    <Card.Body>
                                        <Card.Title>Algorithms in Java</Card.Title>
                                        <Card.Text>
                                        25 MATIC
                                        </Card.Text>
                                        <Card.Text>
                                        Try out our newly-released course in Java and impress your interviewers.
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Full Algorithms Course in C++</ListGroupItem>
                                        <ListGroupItem>Object Oriented Design Tips</ListGroupItem>
                                        <ListGroupItem>Memory Management Tips</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                        <Button variant="outline-dark" href="payment">Buy Now</Button>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem' }} className="m-2" bg="warning" border="light">
                                    {/* <Card.Img variant="top" src="https://picsum.photos/180/100" /> */}
                                    <Card.Body>
                                        <Card.Title>Algorithms in Python</Card.Title>
                                        <Card.Text>
                                        80 MATIC
                                        </Card.Text>
                                        <Card.Text>
                                        Try out our newest course in Python and impress your interviewers.
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Full Algorithms Course in C++</ListGroupItem>
                                        <ListGroupItem>Data Structures Cheat Sheet</ListGroupItem>
                                        <ListGroupItem>Memory Management Tips</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                        <Button variant="outline-dark" href="payment">Buy Now</Button>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};