import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch, useSelector } from "react-redux";
// import { createProduct } from "../features/merchantSlice";
import { useWeb3Context } from "../features/Web3Context";

import ConnectButton from "../../components/ConnectButton";

import { ethers } from "ethers";

export default function EditProduct() {
  const params = useParams();
  const product_id = params.productID;
  const dispatch = useDispatch();

  const store_id = useSelector((state) => state.merchant.user.stores[0].wallet);

  const product = useSelector((state) =>
    state.merchant.user.stores[0].products.find(
      (product) => product.id === product_id
    )
  );

  const { address, contract } = useWeb3Context();

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // console.log(contract)

  const [newProduct, setNewProduct] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    features: product.features[0],
    store_id: store_id,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewProduct((values) => ({ ...values, [name]: value }));
  };

  const editProduct = async (product) => {
    try {
      setShowModal(true);

      const tx = await contract.updateProductPrice(
        store_id,
        newProduct.id,
        ethers.utils.parseEther(newProduct.price)
      );
      const receipt = await tx.wait();
      console.log("Transaction receipt");
      console.log(receipt);

      if (receipt) {
        // alert("Thank you for your purchase!")
        setShowModal(false);
        navigate(`/merchant/products`);
      }
    } catch (error) {
      console.error(error);
      setShowModal(false);
      alert("Transaction failed :(");
    }
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
                  />
                </Form.Group>

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
                    value={newProduct.features}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => editProduct(newProduct)}
                >
                  Edit Product
                </Button>
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
