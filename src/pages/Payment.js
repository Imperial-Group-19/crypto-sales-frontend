import React from "react";
import {Helmet} from "react-helmet";
import PaymentForm from "../components/PaymentForm";
import { Container, Row, Col } from "react-bootstrap";

export default function Payment() {
    return (
        <>
            <Helmet>
                <title>Payment page</title>
                <meta name="description" content="Check if the amount is correct and make the payment" />
            </Helmet>
            <Container>
                <Row>
                    <Col>
                        <h1 className="display-1">Payment page</h1>
                        <PaymentForm />  
                    </Col>
                </Row>
            </Container>
        </>
    );
};
