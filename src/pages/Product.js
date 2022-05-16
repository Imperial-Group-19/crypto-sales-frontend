import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Headline from "../components/Headline";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { addToCart } from "../features/shopSlice";
import { MdOutlineLocalOffer } from "react-icons/md";
import { ethers } from "ethers";

export default function Product() {
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.shop.products.filter((product) => product.productType !== 3)
  );
  const currentProduct = products.find(
    (product) => product.productName === params.productID
  );
  const upsellProduct = products.find((product) => product.productType === 1);
  const downsellProduct = products.find((product) => product.productType === 2);
  const mainProduct = products.find((product) => product.productType === 0);

  // Hook for displaying modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    if (currentProduct.productType === 0) {
      setShow(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Landing Page - all products</title>
        <meta name="description" content="Product" />
      </Helmet>
      <Header />
      <Container className="centered">
        <Col className="products-border">
          <Row>
            <h1 className="h1-products">Having problems with C++?</h1>
          </Row>
          <Row className="font-and-color lead margin-bottom">
            <p>Try our new algorithms course. Now in C++!</p>
          </Row>
          <Row className="font-and-color">
            <Card style={{ display: "flex" }}>
              <Card.Header className="font-and-color">
                <MdOutlineLocalOffer></MdOutlineLocalOffer> Limited time offer
              </Card.Header>
              <Card.Body>
                <Card.Title>{currentProduct.title}</Card.Title>
                <Card.Text>{currentProduct.description}</Card.Text>
              </Card.Body>
              <ListGroup variant="flush">
                {currentProduct.features.map((feature, index) => (
                  <ListGroupItem key={index} className="font-and-color">
                    {feature}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Card.Body>
                <Card.Text>
                  {ethers.utils.formatEther(currentProduct.price.toString()) +
                    " MATIC"}
                </Card.Text>
                <div className="d-grid gap-2">
                  {currentProduct.productType === 0 ? (
                    <Button
                      variant="secondary"
                      className="button-buy-product"
                      onClick={handleOpen}
                    >
                      Buy Now
                    </Button>
                  ) : (
                    <Link to={"/" + params.storeID + "/products/"}>
                      <Button
                        variant="secondary"
                        className="button-buy-product"
                        style={{ width: "100%" }}
                        onClick={() =>
                          dispatch(addToCart(currentProduct.productName))
                        }
                      >
                        Buy Now
                      </Button>
                    </Link>
                  )}
                  {currentProduct.productType ===
                  2 ? null : currentProduct.productType === 1 ? (
                    <Link to={"/" + params.storeID + "/products"}>
                      <Button
                        variant="link"
                        className="custom-link"
                        onClick={() =>
                          dispatch(addToCart(mainProduct.productName))
                        }
                      >
                        Not interested, check out for {mainProduct.title}{" "}
                        instead
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      to={
                        "/" +
                        params.storeID +
                        "/products/" +
                        downsellProduct.productName
                      }
                    >
                      <Button variant="link" className="custom-link">
                        Show me something cheaper
                      </Button>
                    </Link>
                  )}
                </div>
              </Card.Body>
              {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
          </Row>
        </Col>
      </Container>
      {/* <Headline /> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Special Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Since you're interested in our C++ course, we have a special offer for
          you!
        </Modal.Body>
        <Modal.Footer>
          <Link
            to={"/" + params.storeID + "/products/" + upsellProduct.productName}
          >
            <Button variant="primary" onClick={handleClose}>
              Show me more!
            </Button>
          </Link>
          <Link to={"/" + params.storeID + "/products/"}>
            <Button
              variant="link"
              onClick={() => dispatch(addToCart(currentProduct.productName))}
            >
              I'm not interested
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
