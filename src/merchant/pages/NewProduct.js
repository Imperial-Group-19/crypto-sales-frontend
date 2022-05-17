import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import MerchantHeader from "../components/MerchantHeader";
import { useDispatch, useSelector } from "react-redux";
// import { createProduct } from "../features/merchantSlice";
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

export default function NewProduct(props) {
  const client = props.client;

  const { address, contract } = useWeb3Context();

  const store = useSelector((state) =>
    state.merchant.user.stores.find((store) => store.storeOwner === address)
  );

  const store_id = store.id;

  const [showModal, setShowModal] = useState(false);

  const [productCreated, setProductCreated] = useState(false);

  const navigate = useNavigate();

  console.log(store_id);
  const productEnum = {
    main: 0,
    upsell: 1,
    downsell: 2,
    crosssell: 3,
  };

  const params = useParams();
  const productTypeName = params.productType;
  const productType = productEnum[productTypeName];

  console.log("product type: ", productType);

  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    features: [],
    productType: productType,
    productLink: "",
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
        newProduct.productType,
        ethers.utils.parseEther(newProduct.price)
      );

      const tx = await contract.createProduct(
        store_id,
        newProduct.id,
        newProduct.productType,
        ethers.utils.parseEther(newProduct.price)
      );
      const receipt = await tx.wait();
      console.log("Transaction receipt");
      console.log(receipt);

      if (receipt) {
        // alert("Thank you for your purchase!")
        setShowModal(false);
        setProductCreated(true);
        // navigate(`/merchant/${store_id}/products`)
      }
    } catch (error) {
      console.error(error);
      setShowModal(false);
      alert("Transaction failed :(");
    }
  };

  const addProductDeatils = (newProduct) => {
    const apiCall = {
      id: 10,
      jsonrpc: "2.0",
      method: "updateValue",
      params: [
        "products",
        {
          productName: newProduct.id,
          title: newProduct.title,
          description: newProduct.description,
          storeAddress: newProduct.store_id.toLowerCase(),
          price: parseInt(ethers.utils.parseEther(newProduct.price.toString())),
          features: [newProduct.features],
          productType: productType,
          productLink: newProduct.productLink,
        },
      ],
    };

    // send product details to backend
    client.send(JSON.stringify(apiCall));
    console.log(apiCall);
    navigate(`/merchant/products`);
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
                    disabled={productCreated}
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
                    disabled={productCreated}
                  />
                </Form.Group>
                {productCreated ? (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <BiChip className="payment-icons"></BiChip> Title of
                        product
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
                        <BiDetail className="payment-icons"></BiDetail>{" "}
                        Description of product
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
                        <BiCategory className="payment-icons"></BiCategory>{" "}
                        Product Feature
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
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <BiLink className="payment-icons"></BiLink> Product Link
                      </Form.Label>
                      <Form.Control
                        type="string"
                        name="productLink"
                        className="font-and-color"
                        placeholder="Link to your information product"
                        value={newProduct.productLink}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                ) : null}
                {!productCreated ? (
                  <Button
                    variant="primary"
                    className="button-multifunctional"
                    onClick={() => createProduct(newProduct)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="button-multifunctional"
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
