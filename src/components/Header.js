import React, { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";


export default function Header() {
    return (
        <Container fluid>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="landing">Super Algorithms Course Maker Inc.</Navbar.Brand>
                    <Button variant="outline-secondary" href="products">See Our Courses</Button>
                </Container>
            </Navbar>
        </Container>

    )
}