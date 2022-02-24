import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Navbar, Button } from "react-bootstrap";

import { useSelector } from "react-redux";

export default function Header() {
  const mainProduct = useSelector((state) =>
    state.merchant.user.stores[0].products.find(
      (product) => product.type === "main"
    )
  );
  const params = useParams();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href={`/${params.storeID}/products/${mainProduct.id}`}>
          Super Algorithms Course Maker II. Inc.
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
