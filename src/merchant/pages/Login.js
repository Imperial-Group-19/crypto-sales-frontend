import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";


export default function Login() {
    return (
        <>
            <MerchantHeader button="Switch to Register" link="/merchant/register"/>
            <Container>
                <Row>
                    <h1>Login</h1>
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
                                    type="password"
                                    name="password"
                                    placeholder="Must have at least 6 characters"
                                />
                            </Form.Group>
                            <Link to="/merchant/stores"><Button variant="outline-secondary">Login</Button></Link>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
            
        </>
    );
};