import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { VscDebugDisconnect } from "react-icons/vsc";
import {
  AiOutlineWallet,
  AiFillWallet,
  AiOutlineDisconnect,
} from "react-icons/ai";
import {
  BiCoin,
  BiCoinStack,
  BiWallet,
  BiWalletAlt,
  BiMailSend,
} from "react-icons/bi";
import { RiHandCoinLine } from "react-icons/ri";

import { ethers } from "ethers";

import { useWeb3Context } from "../merchant/features/Web3Context";

export default function PaymentForm() {
  const params = useParams();
  const price = useSelector((state) => state.shop.total);
  const products = useSelector((state) => state.shop.addedProducts);
  const storeAddress = products[0].storeAddress;
  const ids = products.map((product) => product.productName);

  const {
    contract,
    handleDisconnectWallet,
    connected,
    address,
    handleConnectWallet,
  } = useWeb3Context();

  const [showModal, setShowModal] = useState(false);
  const [showMetamaskModal, setShowMetamaskModal] = useState(false);

  let navigate = useNavigate();

  console.log(ids);

  const handleWallet = () => {
    if (!window.ethereum) {
      // alert("Please install Metamask: https://metamask.io/");
      setShowMetamaskModal(true);
      return;
    }

    handleConnectWallet();
  };

  const makePayment = async () => {
    // TODO: write function to fetch price of products from smart contract

    const txInfo = {
      gasLimit: 250000,
      value: price.toString(),
    };

    try {
      setShowModal(true);
      const tx = await contract.makePayment(storeAddress, ids, txInfo);

      const receipt = await tx.wait();
      console.log("Transaction receipt");
      console.log(receipt);

      if (receipt) {
        // alert("Thank you for your purchase!")
        setShowModal(false);
        navigate("/confirmation");
      }
    } catch (error) {
      console.error(error);
      setShowModal(false);
      alert("Transaction failed :(");
    }
  };

  const [inputs, setInputs] = useState({
    customerWalletAddress: "",
    merchantWalletAddress: storeAddress,
    coinType: "Polygon (MATIC)",
    amount: Number(15.34),
    gasSpend: Number(0),
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };

  return (
    <div>
      {console.log(useSelector((state) => state.shop.total))}
      <div className="d-grid gap-2">
        {connected ? (
          <Button
            className="disconnect font-and-color button-payment-disconnet"
            variant="outline-danger"
            type="submit"
            onClick={handleDisconnectWallet}
          >
            <VscDebugDisconnect className="payment-icons"></VscDebugDisconnect>{" "}
            Disconnect Wallet
          </Button>
        ) : (
          <Button
            className="connect font-and-color button-payment-connect"
            variant="outline-success"
            type="submit"
            onClick={handleWallet}
          >
            <AiOutlineDisconnect className="payment-icons"></AiOutlineDisconnect>{" "}
            Connect Wallet
          </Button>
        )}
      </div>

      <hr></hr>

      <Form className="font-and-color">
        <Form.Group className="mb-3" controlId="formcustomerWalletAddress">
          <Form.Label>
            <BiWallet className="payment-icons"></BiWallet> Your Wallet Address
          </Form.Label>
          <Form.Control
            className="font-and-color"
            type="text"
            name="customerWalletAddress"
            placeholder="Wallet address"
            value={address}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formmerchantWalletAddress">
          <Form.Label>
            <BiWalletAlt className="payment-icons"></BiWalletAlt> Merchant's
            Wallet Address
          </Form.Label>
          <Form.Control
            className="font-and-color"
            type="text"
            name="merchantWalletAddress"
            placeholder="Merchant Wallet"
            value={storeAddress}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formmercoinType">
          <Form.Label>
            <BiCoin className="payment-icons"></BiCoin> Coin
          </Form.Label>
          <Form.Control
            className="font-and-color"
            type="text"
            name="coinType"
            placeholder="Polygon (MATIC)"
            value={inputs.coinType}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formamount">
          <Form.Label>
            <BiCoinStack className="payment-icons"></BiCoinStack> Amount
          </Form.Label>
          <Form.Control
            className="font-and-color"
            type="string"
            name="amount"
            value={ethers.utils.formatEther(price.toString())}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>
            <BiMailSend className="payment-icons"></BiMailSend> E-mail Address
          </Form.Label>
          <Form.Control
            className="font-and-color"
            type="string"
            name="email"
            placeholder="Enter your e-mail to receive your product"
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            variant="outline-danger"
            className="button-payment-pay"
            onClick={makePayment}
            disabled={!connected}
          >
            {connected ? (
              <div>
                <RiHandCoinLine className="payment-icons"></RiHandCoinLine>Pay
              </div>
            ) : (
              <div>
                <RiHandCoinLine className="payment-icons"></RiHandCoinLine>
                Connect Wallet To Pay
              </div>
            )}
          </Button>
        </div>
      </Form>
      <Modal show={showModal} backdrop="static">
        <Modal.Body>Mining your transaction...</Modal.Body>
      </Modal>
      <Modal show={showMetamaskModal} backdrop="static">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/assets/metamask.png" width="200" />
        </div>
        <Modal.Body>
          Please install the Metamask wallet to pay for your items!
        </Modal.Body>
        <Modal.Footer>
          <a href="https://metamask.io" target="_blank">
            <Button variant="primary">Download Here</Button>
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
