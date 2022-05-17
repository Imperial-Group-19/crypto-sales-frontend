import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router-dom";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { loginUser } from "../features/merchantSlice";
import { useWeb3Context } from "../features/Web3Context";

import ConnectButton from "../../components/ConnectButton";

export default function Login() {
  const { address } = useWeb3Context();

  console.log(address);

  return (
    <>
      {/* <MerchantHeader button="Switch to Register" link="/merchant/register" /> */}
      {address ? (
        <Navigate to="/merchant/stores" />
      ) : (
        <Container>
          <Row>
            <h1 className="h1-merchant centered">Login</h1>
          </Row>
          <Row>
            <Col>
              <ConnectButton />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
