import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";

import ConnectButton from "../../components/ConnectButton";
import { useWeb3Context } from "../features/Web3Context";

export default function Stores() {
  const stores = useSelector((state) => state.merchant.user.stores);
  const name = useSelector((state) => state.merchant.user.name);

  const { connected } = useWeb3Context();

  const hasStore = stores.length > 0;

  return (
    <>
      <MerchantHeader button="Logout" link="/logout" />
      {!connected ? (
        <ConnectButton />
      ) : (
        <Container>
          <h1>Welcome, {name}</h1>
          <h2>My store</h2>
          {stores.map((store) => (
            <Card key={store.id}>
              <Card.Body>
                <Card.Title>{store.name}</Card.Title>
                <Card.Text>{store.description}</Card.Text>
                <Link to={"/merchant/analytics"}>
                  <Button variant="primary" className="m-2">
                    View Analytics
                  </Button>
                </Link>
                <Link to={"/merchant/products"}>
                  <Button variant="primary" className="m-2">
                    View Products
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
          {!hasStore && (
            <Card>
              <Card.Body>
                <Link to="/merchant/new-store">
                  <Button variant="secondary">Add a new store</Button>
                </Link>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </>
  );
}
