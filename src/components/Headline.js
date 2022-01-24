import React, { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";


export default function Headline() {
    return (
        <Container>
            <h1>Having problems with your coding interviews?</h1>
            <h2>Try our new algorithms course. Now available in 3 programming languages</h2>
            <ul>
                <li>C++</li>
                <li>Java</li>
                <li>Python</li>
            </ul>
            <Button variant="outline-success" href="products">See our Courses</Button>
        </Container>
    )
}