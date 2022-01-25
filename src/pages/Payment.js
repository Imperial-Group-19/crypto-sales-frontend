import React from "react";
import PaymentForm from "../components/PaymentForm";
import { Container, Row, Col } from "react-bootstrap";

export default function Payment() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="display-1">Payment page</h1>
                    <PaymentForm />  
                </Col>
            </Row>
        </Container>
    );
};
