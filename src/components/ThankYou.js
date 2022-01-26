import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function ThankYou() {
    return (
        <Container style={{ width: '50rem' }}>
            <h1 className="display-1">Thank you for your purchase!</h1>
            <Link to="/">Back to Main Page</Link>
        </Container>
    );
};