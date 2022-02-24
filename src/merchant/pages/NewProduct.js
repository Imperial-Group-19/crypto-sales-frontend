import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch, useSelector } from "react-redux";
// import { createProduct } from "../features/merchantSlice";
import { useWeb3Context } from "../features/Web3Context";

import ConnectButton from "../../components/ConnectButton";

import { ethers } from "ethers";

export default function NewProduct() {
  const store_id = useSelector((state) => state.merchant.user.stores[0].wallet);

  const { address, contract } = useWeb3Context();

  const [showModal, setShowModal] = useState(false);

  const [productCreated, setProductCreated] = useState(false);

  const navigate = useNavigate();

  // console.log(contract)

  const params = useParams();
  const productType = params.productType;

  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    features: [],
    store_id: store_id,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewProduct((values) => ({ ...values, [name]: value }));
  };

  const createProduct = async (product) => {
    try {
      setShowModal(true);

      console.log(
        store_id,
        newProduct.id,
        ethers.utils.parseEther(newProduct.price)
      );

      // const tx = await contract.createProduct(store_id, newProduct.id, ethers.utils.parseEther(newProduct.price));
      // const receipt = await tx.wait();
      // console.log('Transaction receipt');
      // console.log(receipt);

      // if(receipt) {
      // alert("Thank you for your purchase!")
      setShowModal(false);
      setProductCreated(true);
      // navigate(`/merchant/${store_id}/products`)
      // }
    } catch (error) {
      console.error(error);
      setShowModal(false);
      alert("Transaction failed :(");
    }
  };

  const addProductDeatils = (newProduct) => {
    // send product details to backend
    console.log(newProduct);
    navigate(`/merchant/products`);
  };

  return (
    <>
      <MerchantHeader button="Logout" link="/logout" />
      {!address ? (
        <ConnectButton />
      ) : (
        <Container>
          <Row>
            <h1>Your new product</h1>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>A unique identifier for your product</Form.Label>
                  <Form.Control
                    type="string"
                    name="id"
                    placeholder="digital-product"
                    value={newProduct.id}
                    onChange={handleChange}
                    disabled={productCreated}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price in MATIC</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="0.35"
                    value={newProduct.price}
                    onChange={handleChange}
                    disabled={productCreated}
                  />
                </Form.Group>
                {productCreated ? (
                  <div>
                    <Form.Group>
                      <Form.Label>Title of product</Form.Label>
                      <Form.Control
                        type="string"
                        name="title"
                        placeholder="Ebook"
                        value={newProduct.title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description of product</Form.Label>
                      <Form.Control
                        type="string"
                        name="description"
                        placeholder="Best prices for digital products in Imperial"
                        value={newProduct.description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Product Feature</Form.Label>
                      <Form.Control
                        type="string"
                        name="features"
                        placeholder="Some feature"
                        value={newProduct.features[0]}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                ) : null}
                {!productCreated ? (
                  <Button
                    variant="primary"
                    onClick={() => createProduct(newProduct)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => addProductDeatils(newProduct)}
                  >
                    Create Product
                  </Button>
                )}
                {/* <Button variant="primary" onClick={() => dispatch(createProduct(newProduct))}>Create store</Button> */}
              </Form>
            </Col>
          </Row>
          <Modal show={showModal} backdrop="static">
            <Modal.Body>Adding your product...</Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
}
