import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/shopSlice";
import ShoppingCart from "../components/ShoppingCart";

export default function Products() {
  const allProducts = useSelector((state) => state.shop.products);
  const addedProducts = useSelector((state) => state.shop.addedProducts);
  const total = useSelector((state) => state.shop.total);
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const products = allProducts.filter(
    (product) => product.type === "crosssell"
  );

  const productList = (products, addedProducts) => {
    return (
      <>
        {products.map((product) => (
          <Card
            id={product.product_id}
            key={product.product_id}
            style={{ width: "20rem" }}
            className="m-2"
            text="light"
            bg="secondary"
            border="light"
          >
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.price} MATIC</Card.Text>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {product.features.map((feature) => {
                return <ListGroupItem key={feature}>{feature}</ListGroupItem>;
              })}
            </ListGroup>
            <Card.Body>
              <div className="d-grid gap-2">
                {addedProducts.length === 0 ||
                !addedProducts.find(
                  (added) => added.product_id === product.product_id
                ) ? (
                  <Button
                    variant="outline-light"
                    size="lg"
                    onClick={() => dispatch(addToCart(product.product_id))}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Button
                    variant="outline-dark"
                    size="lg"
                    onClick={() => dispatch(removeFromCart(product.product_id))}
                  >
                    Remove From Cart
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Products - detailed information</title>
        <meta
          name="description"
          content="See a detailed information about the products, including their price and buy"
        />
      </Helmet>
      <Header />
      <Container>
        {/* <Row>
          <h1 className="display-1">Your current selection</h1>
        </Row> */}
        <Row>
          <Card>
            <Card.Header as="h3">Your current selection</Card.Header>
            <Card.Body>
              <Card.Title>C++ Deluxe</Card.Title>
              <Card.Text>
                100000 MATIC
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <h3 >Our recommended add-ons</h3>
        </Row>
        <Row>
          {productList(products, addedProducts)}
          {/* <Col xs={3}>
                        <ShoppingCart/>
                    </Col> */}
        </Row>
      </Container>
    </>
  );
}
