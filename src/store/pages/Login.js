import React from "react";
import { Form, Button } from "react-bootstrap";
import MerchantHeader from "../components/MerchantHeader";


export default function Login() {
    return (
        <>
            <MerchantHeader />
            <Container>
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
                    <Button variant="outline-secondary">Login</Button>
                </Form>
            </Container>
            
        </>
    );
};