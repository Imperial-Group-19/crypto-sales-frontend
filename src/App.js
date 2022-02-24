import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useDispatch } from "react-redux";
import { loadStores } from "./merchant/features/merchantSlice";
import { loadProducts } from "./features/shopSlice";

import Landing from './pages/Landing';
import Payment from './pages/Payment';
import Products from './pages/Products';
import Confirmation from './pages/Confirmation';
import Login from "./merchant/pages/Login";
import Stores from "./merchant/pages/Stores";
import NewStore from "./merchant/pages/NewStore";
import StoreProducts from "./merchant/pages/StoreProducts";
import NewProduct from "./merchant/pages/NewProduct";
import EditProduct from "./merchant/pages/EditProduct";
import Product from "./pages/Product";
import NoPage from "./pages/NoPage";

import { useWeb3Context } from "./merchant/features/Web3Context";

// Web sockets
const client = new W3CWebSocket("ws://127.0.0.1:5001");
client.binaryType = "arraybuffer";

export default function App() {

  const { connected, handleConnectWallet } = useWeb3Context();

  // Dispatch for redux
  const dispatch = useDispatch();

  // Set subscription type
  const apiCall = {"id":0,"jsonrpc":"2.0","method":"subscribe","params":["products", "stores"]};

  // Send subscription type for initial handshake
  client.onopen = () => {
    console.log("WebSocket Client Connected");
    client.send(JSON.stringify(apiCall));
  };

  // Handle incoming data from backend (update state)
  client.onmessage = (event) => {
    const u8intarray = new Uint8Array(event.data);
    const string = new TextDecoder().decode(u8intarray);
    const data = JSON.parse(string);
    console.log(data);

    if (data.params) {
      if (data.params[0] === "products") {
        let products = data.params[1];
        console.log(products);
        dispatch(loadProducts(products));
      }
      if (data.params[0] === "stores") {
        let stores = data.params[1];
        console.log(stores);
        dispatch(loadStores(stores));
      }
    }
    
  };

  // check if user has already connected wallet
  const checkWeb3Status = async () => {
    if(!connected){
      handleConnectWallet();
    }
  }

  useEffect(() => {
    checkWeb3Status();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Affiliate pages*/}
        {/* Merchant pages*/}
        <Route path="/merchant/login" element={<Login />} />
        <Route path="/merchant/stores" element={<Stores />}/>
        <Route path="/merchant/new-store" element={<NewStore client={client}/>}/>
        <Route path="/merchant/products" element={<StoreProducts />}/>
        <Route path="/merchant/products/:productID" element={<EditProduct />}/>
        <Route path="/merchant/new-product/:productType" element={<NewProduct />}/>

        {/* Sales Funnel pages*/}
        <Route path="/landing" element={<Landing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/:storeID/products/:productID" element={<Product />} />
        <Route path="/:storeID/products" element={<Products />} />
        <Route path="/" element={<Landing />} />

        {/* 404 page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

