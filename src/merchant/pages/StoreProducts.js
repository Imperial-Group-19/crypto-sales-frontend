import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";
import { string } from "prop-types";

export default function StoreProducts() {
  const params = useParams();
  // const store = useSelector((state) => state.merchant.user.stores.find(store => store.id === params.storeID));
  const store = useSelector((state) => state.merchant.user.stores[0]);

  const products = store.products;

  const hasMainProduct = products.find((product) => product.type === "main");
  const hasUpsellProduct = products.find(
    (product) => product.type === "upsell"
  );
  const hasDownsellProduct = products.find(
    (product) => product.type === "downsell"
  );

  return (
    <>
      <MerchantHeader button="Logout" link="/logout" />
      <Container>
        <h1>{store.name}</h1>
        <Container>
          <Row className="m-3">
            <Col>Title</Col>
            <Col>Price</Col>
            <Col>Type</Col>
            <Col></Col>
          </Row>
          {store.products.map((product) => (
            <Row id={product.id} key={product.id} className="m-3">
              <Col>{product.title}</Col>
              <Col>{product.price}</Col>
              <Col>
                {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
              </Col>
              <Col>
                <Link to={"/merchant/products/" + product.id}>
                  <Button>Edit Product</Button>
                </Link>
              </Col>
            </Row>
          ))}
        </Container>

        {!hasMainProduct ? (
          <>
            <Link to={"/merchant/new-product/main"}>
              <Button variant="secondary" className="m-2">
                Add main product
              </Button>
            </Link>
            <br />
          </>
        ) : (
          <>
            {!hasUpsellProduct && (
              <>
                <Link to={"/merchant/new-product/upsell"}>
                  <Button variant="secondary" className="m-2">
                    Add upsell product
                  </Button>
                </Link>
                <br />
              </>
            )}
            {!hasDownsellProduct && (
              <>
                <Link to={"/merchant/new-product/downsell"}>
                  <Button variant="secondary" className="m-2">
                    Add downsell product
                  </Button>
                </Link>
                <br />
              </>
            )}
            <>
              <Link to={"/merchant/new-product/cross-sell"}>
                <Button variant="secondary" className="m-2">
                  Add cross-sell product
                </Button>
              </Link>
            </>
          </>
        )}
      </Container>
    </>
  );
}
