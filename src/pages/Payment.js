import React from "react";
import PaymentForm from "../components/PaymentForm";
import { Container, Row, Col } from "react-bootstrap";

const Payment = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Payment page</h1>
                    <PaymentForm />  
                </Col>
            </Row>
        </Container>
    );
};

export default Payment;