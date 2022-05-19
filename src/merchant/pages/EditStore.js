import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch, useSelector } from "react-redux";
import { loadStores } from "../features/merchantSlice";
import { updateProduct } from "../features/merchantSlice";
import { useWeb3Context } from "../features/Web3Context";
import { BiCoin, BiCoinStack, BiWallet, BiWalletAlt } from "react-icons/bi";
import {
  BiBarcodeReader,
  BiCategory,
  BiChip,
  BiDetail,
  BiLink,
} from "react-icons/bi";

import ConnectButton from "../../components/ConnectButton";

import { ethers } from "ethers";

export default function EditProduct(props) {
  const client = props.client;

  const params = useParams();
  const store_id = params.storeID;
  const dispatch = useDispatch();

  const store = useSelector((state) =>
    state.merchant.user.stores.find((store) => store.id === store_id)
  );

  const { address, contract } = useWeb3Context();

  const [showModal, setShowModal] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);

  const navigate = useNavigate();

  const [newStore, setNewStore] = useState({
    id: store.id,
    title: store.title,
    description: store.description,
    storeOwner: store.storeOwner,
  });

  console.log(newStore);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewStore((values) => ({ ...values, [name]: value }));
  };

  const editStore = async (product) => {
    try {
      const apiCall = {
        id: 0,
        jsonrpc: "2.0",
        method: "updateValue",
        params: [
          "stores",
          {
            id: newStore.id,
            title: newStore.title,
            description: newStore.description,
            storeOwner: newStore.storeOwner,
          },
        ],
      };

      console.log(apiCall);

      // send store details to backend
      client.send(JSON.stringify(apiCall));

      setShowModal(false);
      navigate(`/merchant/login`);
    } catch (error) {
      console.error(error);
      alert("Server failed :(");
    }
  };

  return (
    <>
      <MerchantHeader button="Logout" link="/logout" />
      {!address ? (
        <ConnectButton />
      ) : (
        <Container className="width-80">
          <Row>
            <h1 className="h1-products centered">Your new product</h1>
            <hr className="margin-top-negative"></hr>
          </Row>
          <Row>
            <Col>
              <Form className="font-and-color">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiBarcodeReader className="payment-icons"></BiBarcodeReader>{" "}
                    Your Unique Store Wallet
                  </Form.Label>
                  <Form.Control
                    type="string"
                    disabled
                    name="id"
                    className="font-and-color"
                    placeholder="digital-product"
                    value={newStore.id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiCoin className="payment-icons"></BiCoin> Store Owner
                  </Form.Label>
                  <Form.Control
                    type="string"
                    name="storeOwner"
                    disabled
                    className="font-and-color"
                    placeholder="0x"
                    value={newStore.storeOwner}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiChip className="payment-icons"></BiChip> Store Title
                  </Form.Label>
                  <Form.Control
                    type="string"
                    name="title"
                    className="font-and-color"
                    placeholder="Cheap Coding Courses"
                    value={newStore.title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiDetail className="payment-icons"></BiDetail> Store
                    Description
                  </Form.Label>
                  <Form.Control
                    type="string"
                    name="description"
                    className="font-and-color"
                    placeholder="Best prices for digital products in Imperial"
                    value={newStore.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="button-multifunctional"
                  onClick={() => editStore(newStore)}
                >
                  Edit Store
                </Button>
              </Form>
            </Col>
          </Row>
          <Modal show={showModal} backdrop="static">
            <Modal.Body>Editing your product...</Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
}
