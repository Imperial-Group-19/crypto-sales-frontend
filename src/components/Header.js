import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Button } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="landing">
          Super Algorithms Course Maker II. Inc.
        </Navbar.Brand>
        <Link to="/payment">
          <Button variant="outline-secondary">Shopping Cart</Button>
        </Link>
      </Container>
    </Navbar>
  );
}
