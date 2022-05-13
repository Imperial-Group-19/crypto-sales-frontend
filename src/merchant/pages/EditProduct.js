import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch, useSelector } from "react-redux";
// import { createProduct } from "../features/merchantSlice";
import { useWeb3Context } from "../features/Web3Context";
import { BiCoin, BiCoinStack, BiWallet, BiWalletAlt } from "react-icons/bi";
import { BiBarcodeReader, BiCategory, BiChip, BiDetail } from "react-icons/bi";

import ConnectButton from "../../components/ConnectButton";

import { ethers } from "ethers";

export default function EditProduct(props) {
  const client = props.client;

  const params = useParams();
  const product_id = params.productID;
  const productType = params.productType;
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

        const apiCall = {
          id: 0,
          jsonrpc: "2.0",
          method: "insert",
          params: [
            "products",
            {
              productName: newProduct.id,
              title: newProduct.title,
              description: newProduct.description,
              storeAddress: newProduct.store_id,
              price: newProduct.price,
              features: newProduct.features,
              productType: productType,
            },
          ],
        };

        // send product details to backend
        client.send(apiCall);

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
                    A unique identifier for your product
                  </Form.Label>
                  <Form.Control
                    type="string"
                    name="id"
                    className="font-and-color"
                    placeholder="digital-product"
                    value={newProduct.id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiCoin className="payment-icons"></BiCoin> Price in MATIC
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    className="font-and-color"
                    placeholder="0.35"
                    value={newProduct.price}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiChip className="payment-icons"></BiChip> Title of product
                  </Form.Label>
                  <Form.Control
                    type="string"
                    name="title"
                    className="font-and-color"
                    placeholder="Ebook"
                    value={newProduct.title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiDetail className="payment-icons"></BiDetail> Description
                    of product
                  </Form.Label>
                  <Form.Control
                    type="string"
                    name="description"
                    className="font-and-color"
                    placeholder="Best prices for digital products in Imperial"
                    value={newProduct.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <BiCategory className="payment-icons"></BiCategory> Product
                    Feature
                  </Form.Label>
                  <Form.Control
                    type="string"
                    name="features"
                    className="font-and-color"
                    placeholder="Some feature"
                    value={newProduct.features}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="button-multifunctional"
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
