import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Button } from "react-bootstrap";
import { FaUserSecret } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

import { useWeb3Context } from "../features/Web3Context";

export default function MerchantHeader(props) {
  const { handleDisconnectWallet } = useWeb3Context();

  return (
    // <Container fluid>
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/merchant/stores" className="title-header">
          <div className="title-header">Crypto Sales Funnel</div>
        </Navbar.Brand>
        <Button variant="secondary" className="moving-button" onClick={handleDisconnectWallet}>
          <span>
            <FaUserSecret className="payment-icons"></FaUserSecret>{" "}
            {props.button}
          </span>
        </Button>
      </Container>
    </Navbar>
    // </Container>
  );
}
