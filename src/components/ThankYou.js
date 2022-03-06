import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { MdDoneOutline } from "react-icons/md";

export default function ThankYou() {
  return (
    <Container className="centered">
      <h1 className="h1-thankyou centered">Thank you for your purchase!</h1>
      <MdDoneOutline className="success-icon"></MdDoneOutline>
      <p className="font-and-color">
        {" "}
        Please check your email for further instructions on how to access your
        product.
      </p>
      <p className="font-and-color">
        Having trouble?{" "}
        <Link to="/" className="custom-link">
          Contact us
        </Link>
      </p>
      <hr></hr>
      <Link to="/" className="custom-link">
      <div className="centered">
            <Button variant="secondary" className="button-go-back-thankyou" >
              Back to Main Page
            </Button>
          </div>
      </Link>
    </Container>
  );
}
