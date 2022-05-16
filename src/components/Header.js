import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Navbar, Button } from "react-bootstrap";

import { useSelector } from "react-redux";

export default function Header() {
  const mainProduct = useSelector((state) =>
    state.shop.products.find((product) => product.productType === 0)
  );
  const params = useParams();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          href={`/${params.storeID}/products/${mainProduct.productName}`}
          className="title-header"
        >
          <div className="title-header">
            Super Algorithms Course Maker II. Inc.
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
