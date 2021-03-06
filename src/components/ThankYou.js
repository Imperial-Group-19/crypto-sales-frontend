import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { MdDoneOutline } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ThankYou() {
  const products = useSelector((state) => state.shop.addedProducts);

  const mainProduct = useSelector((state) =>
    state.shop.products.find((product) => product.productType === 0)
  );
  const storeId = mainProduct.storeAddress;

  return (
    <Container className="centered">
      <h1 className="h1-thankyou centered">Thank you for your purchase!</h1>
      <MdDoneOutline className="success-icon"></MdDoneOutline>
      <p className="font-and-color">
        {" "}
        Click here to download your product(s):
        {products.map((product) => {
          return (
            <>
              <br />
              <a href={product.productLink}>{product.productLink}</a>
            </>
          );
        })}
      </p>
      <p className="font-and-color">
        Having trouble?{" "}
        <Link to="/" className="custom-link">
          Contact us
        </Link>
      </p>
      <hr></hr>
      <Link
        to={`/${storeId}/products/${mainProduct.productName}`}
        className="custom-link"
      >
        <div className="centered">
          <Button variant="secondary" className="button-go-back-thankyou">
            Back to Main Page
          </Button>
        </div>
      </Link>
    </Container>
  );
}
