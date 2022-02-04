import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Container, Navbar, Button } from "react-bootstrap";


export default function Header() {
    return (
        <Container fluid>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="landing">Super Algorithms Course Maker Inc.</Navbar.Brand>
                    <Link to="/payment"><Button variant="outline-secondary">Shopping Cart</Button></Link>
                </Container>
            </Navbar>
        </Container>

    )
}