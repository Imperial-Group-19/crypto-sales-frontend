import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";
import { string } from "prop-types";

import ConnectButton from "../../components/ConnectButton";
import { useWeb3Context } from "../features/Web3Context";
import { BiCoinStack, BiHdd, BiCard } from "react-icons/bi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

export default function StoreProducts() {
  const params = useParams();
  // const store = useSelector((state) => state.merchant.user.stores.find(store => store.id === params.storeID));
  const store = useSelector((state) => state.merchant.user.stores[0]);

  const products = store.products;

  const { connected } = useWeb3Context();

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
      {!connected ? (
        <ConnectButton />
      ) : (
        <Container className="width-80">
          <h1 className="h1-products centered">{store.name}</h1>
          <Container>
            <Row className="h3-products m-3 border-bottom">
              <Col>Title <BiHdd className="payment-icons"></BiHdd></Col>
              <Col>Price <BiCoinStack className="payment-icons"></BiCoinStack></Col>
              <Col>Type <BiCard className="payment-icons"></BiCard></Col>
              <Col>Edit <MdOutlineDriveFileRenameOutline className="payment-icons"></MdOutlineDriveFileRenameOutline></Col>
            </Row>
            {store.products.map((product) => (
              <Row id={product.id} key={product.id} className="m-3 font-and-color">
                <Col>{product.title}</Col>
                <Col>{product.price}</Col>
                <Col>
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </Col>
                <Col>
                  <Link to={"/merchant/products/" + product.id}>
                    <Button className="button-edit">Edit Product</Button>
                  </Link>
                </Col>
              </Row>
            ))}
          </Container>

          {!hasMainProduct ? (
            <>
            <div className="centered">
              <Link to={"/merchant/new-product/main"}>
                <Button variant="secondary" className="m-2">
                  Add main product
                </Button>
              </Link>
              <br />
              </div>
            </>
          ) : (
            <>
              {!hasUpsellProduct && (
                <>
                <div className="centered">
                  <Link to={"/merchant/new-product/upsell"}>
                    <Button variant="secondary" className="button-add-product m-2">
                      Add upsell product
                    </Button>
                  </Link>
                  <br />
                  </div>
                </>
              )}
              {!hasDownsellProduct && (
                <>
                <div className="centered">
                  <Link to={"/merchant/new-product/downsell"}>
                    <Button variant="secondary" className="button-add-product m-2">
                      Add downsell product
                    </Button>
                  </Link>
                  </div>
                  <br />
                </>
              )}
              <>
                <div className="centered">
                <Link to={"/merchant/new-product/cross-sell"}>
                  <Button variant="secondary" className="button-add-product m-2">
                    Add cross-sell product
                  </Button>
                </Link>
                </div>
              </>
            </>
            
          )}
        </Container>
      )}
    </>
  );
}
