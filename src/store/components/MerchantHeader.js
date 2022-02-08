import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Container, Navbar, Button } from "react-bootstrap";


export default function MerchantHeader(props) {
    return (
        <Container fluid>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="landing">Crypto Sales Funnel</Navbar.Brand>
                    <Link to={props.link}><Button variant="outline-secondary">{props.button}</Button></Link>
                </Container>
            </Navbar>
        </Container>

    )
}