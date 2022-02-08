import React from "react";
import MerchantHeader from "../components/MerchantHeader";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";


export default function Register() {
    return (
        <>
            <MerchantHeader button="Switch to Login" link="/merchant/login" />
            <Container>
                <Row>
                    <h1>Register</h1>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>    
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="email"
                                    placeholder="john@cryptofunnel.com"
                                />
                            </Form.Group>
                            <Form.Group>    
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="string"
                                    name="password"
                                    placeholder="Must have at least 6 characters"
                                />
                            </Form.Group>
                            <Link to="/merchant/dashboard">
                                <Button variant="outline-secondary">Register</Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
