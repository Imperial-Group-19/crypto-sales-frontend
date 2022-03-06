import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";

import ConnectButton from "../../components/ConnectButton";
import { useWeb3Context } from "../features/Web3Context";
import { BiStoreAlt } from "react-icons/bi";

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
          <h1 className="h1-merchant centered">Welcome, {name}</h1>
          <h3 className="h2-merchant">
            <BiStoreAlt className="payment-icons"></BiStoreAlt> My Store
          </h3>
          {stores.map((store) => (
            <Card key={store.id} className="border-merchant">
              <Card.Body className="font-and-color">
                <Card.Title>{store.name}</Card.Title>
                <Card.Text>{store.description}</Card.Text>
                <Link to={"/merchant/analytics"}>
                  <Button className="merchant-button m-2" variant="secondary">
                    View Analytics
                  </Button>
                </Link>
                <Link to={"/merchant/products"}>
                  <Button className="merchant-button m-2" variant="secondary">
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
                  <Button className="merchant-button" variant="secondary">Add a new store</Button>
                </Link>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </>
  );
}
