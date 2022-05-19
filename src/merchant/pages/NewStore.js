import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch } from "react-redux";
// import { createStore } from "../features/merchantSlice";
import { useNavigate } from "react-router-dom";
import { createStore } from "../../merchant/features/merchantSlice";

import { useWeb3Context } from "../features/Web3Context";

import ConnectButton from "../../components/ConnectButton";

export default function NewStore(props) {
  const client = props.client;

  const [showModal, setShowModal] = useState(false);

  const [storeCreated, setStoreCreated] = useState(false);

  const { connected, contract, address } = useWeb3Context();

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [newStore, setNewStore] = useState({
    id: "",
    title: "",
    description: "",
    storeOwner: "",
  });

  console.log(newStore);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewStore((values) => ({ ...values, [name]: value }));
  };

  const createStoreContract = async (storeAddress) => {
    try {
      setShowModal(true);

      const tx = await contract.registerStore(newStore.id, 5);
      const receipt = await tx.wait();
      // const receipt = true;
      console.log("Transaction receipt");
      console.log(receipt);

      // setStoreCreated(true);

      if (receipt) {
        // alert("Thank you for your purchase!")
        setShowModal(false);
        // Wait for backend to confirm
        setStoreCreated(true);
        // navigate(`/merchant/${newStore.wallet}/new-product`)
      }
    } catch (error) {
      console.error(error);
      setShowModal(false);
      alert("Transaction failed :(");
    }
  };

  const addStoreDetails = (storeAddress) => {
    const apiCall = {
      id: 0,
      jsonrpc: "2.0",
      method: "updateValue",
      params: [
        "stores",
        {
          id: newStore.id.toLowerCase(),
          title: newStore.title,
          description: newStore.description,
          storeOwner: address.toLowerCase(),
        },
      ],
    };

    console.log(apiCall);

    // send store details to backend
    client.send(JSON.stringify(apiCall));

    navigate(`/merchant/stores`);
  };

  return (
    <>
      <MerchantHeader button="Logout" link="/logout" />
      {!connected ? (
        <ConnectButton />
      ) : (
        <Container>
          <Row>
            <h1>Your new store</h1>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Store Wallet</Form.Label>
                  <Form.Control
                    type="string"
                    name="id"
                    placeholder="Please input your store's MATIC Wallet address"
                    value={newStore.id}
                    onChange={handleChange}
                    disabled={storeCreated}
                  />
                </Form.Group>

                {storeCreated ? (
                  <div>
                    {/* <Form.Group> */}
                    {/* <Form.Label>
                        A unique identifier for your store
                      </Form.Label>
                      <Form.Control
                        type="string"
                        name="id"
                        placeholder="digital-products-store"
                        value={newStore.id}
                        onChange={handleChange}
                        disabled={!storeCreated}
                      />
                    </Form.Group> */}
                    <Form.Group>
                      <Form.Label>Name of store</Form.Label>
                      <Form.Control
                        type="string"
                        name="title"
                        placeholder="Imperial Digital Products Store"
                        value={newStore.title}
                        onChange={handleChange}
                        disabled={!storeCreated}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description of store</Form.Label>
                      <Form.Control
                        type="string"
                        name="description"
                        placeholder="Best prices for digital products in Imperial"
                        value={newStore.description}
                        onChange={handleChange}
                        disabled={!storeCreated}
                      />
                    </Form.Group>
                  </div>
                ) : null}
                {!storeCreated ? (
                  <Button
                    variant="primary"
                    onClick={() => createStoreContract(newStore)}
                    style={{ marginTop: "15px" }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => addStoreDetails(newStore)}
                    style={{ marginTop: "15px" }}
                  >
                    Create Store
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
          <Modal show={showModal} backdrop="static">
            <Modal.Body>Creating your store...</Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
}
