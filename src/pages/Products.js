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
import { Link, useParams } from "react-router-dom";
import { BiCoin } from "react-icons/bi";
import { RiHandCoinLine } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsBasket } from "react-icons/bs";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

export default function Products() {
  const allProducts = useSelector((state) => state.shop.products);
  const addedProducts = useSelector((state) => state.shop.addedProducts);
  const total = useSelector((state) => state.shop.total);
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const params = useParams();

  const products = allProducts.filter(
    (product) => product.type === "crosssell"
  );

  const selectedProduct = addedProducts.find(
    (product) => product.type !== "crosssell"
  );

  const productList = (products, addedProducts) => {
    return (
      <>
        {products.map((product) => (
          <Card
            id={product.product_id}
            key={product.product_id}
            className="m-4 font-and-color products-border-one"
            bg="light"
          >
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.price} MATIC{" "}
                <BiCoin className="payment-icons"></BiCoin>
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {product.features.map((feature) => {
                return <ListGroupItem className="font-and-color" key={feature}>{feature}</ListGroupItem>;
              })}
            </ListGroup>
            <Card.Body>
              <div className="d-grid gap-2">
                {addedProducts.length === 0 ||
                !addedProducts.find(
                  (added) => added.product_id === product.product_id
                ) ? (
                  <Button
                    className="connect font-and-color button-add-to-basket"
                    variant="outline-success"
                    onClick={() => dispatch(addToCart(product.product_id))}
                  >
                    <MdOutlineLocalGroceryStore className="payment-icons"></MdOutlineLocalGroceryStore>{" "}
                    Add To Cart
                  </Button>
                ) : (
                  <Button
                    className="font-and-color button-remove-from-basket"
                    variant="outline-danger"
                    onClick={() => dispatch(removeFromCart(product.product_id))}
                  >
                    <AiOutlineClose className="payment-icons"></AiOutlineClose>{" "}
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
      <div className="d-flex ml-5">
        <Container className="products-border-round">
          <Row>
            <h2 className="h1-products-all centered">
              Our recommended add-ons
            </h2>
          </Row>
          <Row className="font">{productList(products, addedProducts)}</Row>
        </Container>

        <Container className="ml-auto basket-border-round">
          <Row>
          <h2 className="h1-products-all centered">
            Your current selection
              </h2>
          </Row>
          <Card className="m-4 font-and-color basket-border-one" bg="light">
            <Card.Header className="basket-header-background">
              <h3 className="basket-header centered">
                <BsBasket className="payment-icons-basket"></BsBasket> Basket
              </h3>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {addedProducts.map((product) => (
                  <ListGroupItem className="font-and-color">
                    <Row key={product.id}>
                      <Col>{product.title}</Col>
                      <Col style={{textAlign: "right"}}>{product.price}</Col>
                    </Row>
                  </ListGroupItem>
                ))}
                <ListGroupItem className="font-and-color">
                  <Row>
                    <Col>Total:</Col>
                    <Col style={{textAlign: "right"}}>{total}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
              <Link to={"/payment"}>
                <Button variant="secondary" className="button-buy-product-2" style={{width: "100%"}}>
                  <RiHandCoinLine className="payment-icons"></RiHandCoinLine>{" "}
                  PAYMENT
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
