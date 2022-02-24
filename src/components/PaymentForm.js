import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useWeb3Context } from "../merchant/features/Web3Context";

export default function PaymentForm() {
  const price = useSelector((state) => state.shop.total);
  const products = useSelector((state) => state.shop.addedProducts);
  const storeAddress = useSelector((state) => state.shop.storeAddress);

  const ids = products.map((product) => product.id);

  const {
    contract,
    handleConnectWallet,
    handleDisconnectWallet,
    connected,
    address,
  } = useWeb3Context();

  const [showModal, setShowModal] = useState(false);

  let navigate = useNavigate();

  const makePayment = async () => {
    // TODO: write function to fetch price of products from smart contract

    try {
      setShowModal(true);
      const tx = await contract.makePayment(
        "0x02b7433EA4f93554856aa657Da1494B2Bf645EF0",
        ids
      );

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
    merchantWalletAddress: "0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6",
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
    <>
      {console.log(useSelector((state) => state.shop.total))}
      {connected ? (
        <Button
          className="disconnect"
          variant="outline-danger"
          type="submit"
          onClick={handleDisconnectWallet}
        >
          Disconnect Wallet
        </Button>
      ) : (
        <Button
          className="connect"
          variant="outline-success"
          type="submit"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      )}

      <hr></hr>

      <Form>
        <Form.Group className="mb-3" controlId="formcustomerWalletAddress">
          <Form.Label>Your Wallet Address</Form.Label>
          <Form.Control
            type="text"
            name="customerWalletAddress"
            placeholder="Wallet address"
            value={address}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formmerchantWalletAddress">
          <Form.Label>Merchant's Wallet Address</Form.Label>
          <Form.Control
            type="text"
            name="merchantWalletAddress"
            placeholder="0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6"
            value="0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formmercoinType">
          <Form.Label>Coin</Form.Label>
          <Form.Control
            type="text"
            name="coinType"
            placeholder="Polygon (MATIC)"
            value={inputs.coinType}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formamount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="string"
            name="amount"
            value={String(price)}
            disabled
          />
        </Form.Group>
        <Button variant="success" onClick={makePayment} disabled={!connected}>
          Pay
        </Button>
      </Form>
      <Modal show={showModal} backdrop="static">
        <Modal.Body>Mining your transaction...</Modal.Body>
      </Modal>
    </>
  );
}
