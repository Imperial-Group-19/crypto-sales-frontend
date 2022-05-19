import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";

import ConnectButton from "../components/ConnectButton";
import { useWeb3Context } from "../features/Web3Context";
import { BiStoreAlt } from "react-icons/bi";

export default function Stores() {
  const allStores = useSelector((state) => state.merchant.user.stores);
  const name = useSelector((state) => state.merchant.user.name);

  const allProducts = useSelector((state) => state.merchant.products);

  let storeProducts;
  let mainProduct;

  const { connected, address } = useWeb3Context();

  console.log(address);

  const stores = allStores.filter(
    (store) => store.storeOwner == address.toLowerCase()
  );

  const hasStore = stores.length > 0;

  if (hasStore) {
    storeProducts = allProducts.filter(
      (product) => product.storeAddress === stores[0].id
    );

    mainProduct = storeProducts.find((product) => product.productType === 0);
  }

  return (
    <>
      <MerchantHeader button="Logout" link="/logout" x />
      {!connected ? (
        <ConnectButton />
      ) : (
        <Container>
          <h1 className="h1-merchant centered">
            Welcome, {address.slice(0, 6)}
          </h1>
          <h3 className="h2-merchant">
            <BiStoreAlt className="payment-icons"></BiStoreAlt> My Stores
          </h3>
          {stores.map((store) => (
            <Card key={store.id} className="border-merchant">
              <Card.Body className="font-and-color">
                <Card.Title>{store.title}</Card.Title>
                <Card.Text>{store.description}</Card.Text>
                <Card.Text>Store address: {store.id}</Card.Text>
                <Link to={"/merchant/products"}>
                  <Button className="merchant-button m-2" variant="secondary">
                    View Products
                  </Button>
                </Link>
                <Link to={`/merchant/stores/${store.id}`}>
                  <Button className="merchant-button m-2" variant="primary">
                    Edit Store
                  </Button>
                </Link>
                <Link to={`/${store.id}/products/${mainProduct.productName}`}>
                  <Button
                    className="merchant-button m-2"
                    variant="secondary"
                    style={{ backgroundColor: "#cc9752" }}
                  >
                    Go To Store
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
          {!hasStore && (
            <Card>
              <Card.Body>
                <Link to="/merchant/new-store">
                  <Button className="merchant-button" variant="secondary">
                    Add a new store
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </>
  );
}
