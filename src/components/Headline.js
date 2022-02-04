import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Container, Navbar, Button, ListGroup, Badge } from "react-bootstrap";


export default function Headline() {
    return (
        <Container style={{ width: '50rem' }}>
            <h1 className="display-1">Having problems with your coding interviews?</h1>
            <p className="lead">Try our new algorithms course. Now available in 3 programming languages</p>
            <ListGroup as="ol" numbered >
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    {/* <details> */}
                        {/* <summary> */}
                            <div className="fw-bold">
                                C++ course
                            </div>
                        {/* </summary> */}
                        What a beast this language is. Full of fun and unexpected memory errors. 
                        But, don't worry! With this course, you will be able to say goodbye to segfaults! 
                        Learn to implement algorithms in this language in no time. This is a C-rious course.
                        Money back money kind of quarantined unless you run out of memory and forget to return.
                    {/* </details> */}
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    {/* <details> */}
                        {/* <summary> */}
                            <div className="fw-bold">
                                Java course
                            </div>
                        {/* </summary> */}
                            Your code will run on every system. Compile once and run anywhere.
                            What more can you wish for? By the way, Java is not single. So make sure you don't propose 
                            a Date, or you will be told 'I am not your type'. You can buy her though ;) 
                            Only here on this website!
                    {/* </details> */}
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    {/* <details> */}
                        {/* <summary> */}
                            <div className="fw-bold">
                                Python course
                            </div>
                        {/* </summary> */}
                        Scared of snakes? Worry no more. Pythons are not venomous, 
                        they kill their prey by slowly squeezing it to death. 
                        Just remember, as you are coding your algorithms that speed is a factor! 
                        Or get ready to be squeezed to death.
                    {/* </details> */}
                </div>
            </ListGroup.Item>
            </ListGroup>
            {/* <Button variant="light" href="products">See our Courses</Button> */}
            <br></br>
            <div className="d-grid gap-2">
                <Link to="/products"><Button variant="outline-secondary" size="lg">See Our Courses</Button></Link>
            </div>
        </Container>
    )
}