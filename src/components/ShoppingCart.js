import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

export default function ShoppingCart() {
  const addedProducts = useSelector((state) => state.shop.addedProducts);

  const total = useSelector((state) => state.shop.total);
  return (
    <Container>
      <h2>Your orders</h2>
      {addedProducts.map((product) => (
        <Row key={product.id}>
          <Col>{product.title}</Col>
          <Col>{product.price}</Col>
        </Row>
      ))}
      <Row>
        <Col>
          <h2>Total price: {total}</h2>
        </Col>
      </Row>
    </Container>
  );
}
