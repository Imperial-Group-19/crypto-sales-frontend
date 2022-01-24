import React, { useState } from "react";
import { Container, Navbar, Button, ListGroup, Badge } from "react-bootstrap";


export default function Headline() {
    return (
        <Container>
            <h1 className="display-1">Having problems with your coding interviews?</h1>
            <p className="lead">Try our new algorithms course. Now available in 3 programming languages</p>
            <ListGroup as="ol" numbered>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">C++</div>
                What a beast this language is. Full of fun and unexpected errors. 
                But, don't worry! With this course, you will be able to say segfault goodbye! 
                Learn to implement algorithms in this language in no time.
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Java</div>
                Your code will run on every system. Compile once and run anywhere. What more to wish for? Why do blind programmers use Java? Because they can't C. 
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Python</div>
                Scared of snakes? Worry no more. Pythons are not venomous, they kill their prey by slowly squeezing it to death. Just remember, as you are coding your algorithms that speed is a factor!
                </div>
            </ListGroup.Item>
            </ListGroup>
            {/* <Button variant="light" href="products">See our Courses</Button> */}
        </Container>
    )
}