import React, { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";


export default function Header() {
    return (
        <Container fluid>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="landing">Super Algorithms Course Maker inc.</Navbar.Brand>
                    <Button variant="outline-success" href="products">See our Courses</Button>
                </Container>
            </Navbar>
        </Container>

    )
}