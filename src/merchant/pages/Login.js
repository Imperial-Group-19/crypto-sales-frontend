import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";

export default function Login() {
  return (
    <>
      <MerchantHeader button="Switch to Register" link="/merchant/register" />
      <Container>
        <Row>
          <h1>Login</h1>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Wallet Address</Form.Label>
                <Form.Control
                  type="string"
                  name="email"
                  placeholder="0x7823yfgf7238gf2729g84ffg88326"
                />
              </Form.Group>
              <Link to="/merchant/stores">
                <Button variant="outline-secondary">Login</Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
