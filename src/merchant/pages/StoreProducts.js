import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MerchantHeader from "../components/MerchantHeader";
import { string } from "prop-types";

import ConnectButton from "../../components/ConnectButton";
import { useWeb3Context } from "../features/Web3Context";
import { BiCoinStack, BiHdd, BiCard } from "react-icons/bi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import { ethers } from "ethers";

export default function StoreProducts() {
  const params = useParams();

  const { address, connected, handleConnectWallet } = useWeb3Context();

  const stores = useSelector((state) => state.merchant.user.stores);

  console.log(stores);
  console.log("ADDRESS: ", address);

  const store = useSelector((state) =>
    state.merchant.user.stores.find(
      (store) => store.storeOwner.toLowerCase() === address.toLowerCase()
    )
  );

  const store_id = store.id;
  const allProducts = useSelector((state) => state.merchant.products);

  const products = allProducts.filter(
    (product) => product.storeAddress === store_id.toLowerCase()
  );

  // console.log(store_id);
  // const products = store.products;

  console.log("products: ", products);

  const productEnum = {
    0: "Main Product",
    1: "Upsell",
    2: "Downsell",
    3: "Cross-sell",
  };

  const hasMainProduct = products.find((product) => product.productType === 0);
  const hasUpsellProduct = products.find(
    (product) => product.productType === 1
  );
  const hasDownsellProduct = products.find(
    (product) => product.productType === 2
  );

  // Check if user has already connected wallet
  const checkWeb3Status = async () => {
    if (!connected) {
      handleConnectWallet();
    }
  };

  useEffect(() => {
    checkWeb3Status();
  }, []);

  return (
    <>
      <MerchantHeader button="Logout" link="/logout" />
      {!connected ? (
        <ConnectButton />
      ) : (
        <Container className="width-80">
          <h1 className="h1-products centered">{store.title}</h1>
          <div style={{ paddingLeft: "30px" }}>
            <Link
              to="/merchant/stores"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <p> &lt; Back to stores</p>
            </Link>
          </div>
          <Container>
            <Row className="h3-products m-3 border-bottom">
              <Col>
                Title <BiHdd className="payment-icons"></BiHdd>
              </Col>
              <Col>
                Price <BiCoinStack className="payment-icons"></BiCoinStack>
              </Col>
              <Col>
                Type <BiCard className="payment-icons"></BiCard>
              </Col>
              <Col>
                Edit{" "}
                <MdOutlineDriveFileRenameOutline className="payment-icons"></MdOutlineDriveFileRenameOutline>
              </Col>
            </Row>
            {products.map((product) => (
              <Row
                id={product.productName}
                key={product.productName}
                className="m-3 font-and-color"
              >
                <Col>{product.title}</Col>
                <Col>{ethers.utils.formatEther(product.price.toString())}</Col>
                <Col>
                  {/* {product.type.charAt(0).toUpperCase() + product.type.slice(1)} */}
                  {productEnum[product.productType]}
                </Col>
                <Col>
                  <Link to={"/merchant/products/" + product.productName}>
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
                      <Button
                        variant="secondary"
                        className="button-add-product m-2"
                      >
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
                      <Button
                        variant="secondary"
                        className="button-add-product m-2"
                      >
                        Add downsell product
                      </Button>
                    </Link>
                  </div>
                  <br />
                </>
              )}
              <>
                <div className="centered">
                  <Link to={"/merchant/new-product/crosssell"}>
                    <Button
                      variant="secondary"
                      className="button-add-product m-2"
                    >
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
