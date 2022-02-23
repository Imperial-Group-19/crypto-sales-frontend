import React from "react";
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
import Register from "./merchant/pages/Register";
import Login from "./merchant/pages/Login";
import Stores from "./merchant/pages/Stores";
import NewStore from "./merchant/pages/NewStore";
import StoreProducts from "./merchant/pages/StoreProducts";
import NewProduct from "./merchant/pages/NewProduct";
import Product from "./pages/Product";
import NoPage from "./pages/NoPage";


// Web sockets
const client = new W3CWebSocket("ws://127.0.0.1:5000");
client.binaryType = "arraybuffer";

export default function App() {
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

  return (
    
    <Router>
      <Routes>
        {/* Affiliate pages*/}

        {/* Merchant pages*/}
        {/* <Route path="/merchant/register" element={<Register />}/> */}
        <Route path="/merchant/login" element={<Login />} />
        {/* <Route path="/merchant/stores" element={<Stores />}/> */}
        <Route path="/merchant/new-store" element={<NewStore />}/>
        <Route path="/merchant/:storeID/products" element={<StoreProducts />}/>
        <Route path="/merchant/:storeID/new-product" element={<NewProduct />}/>

        {/* Sales Funnel pages*/}
        <Route path="/landing" element={<Landing />} />
        <Route path="/products/:productID" element={<Product />} />
        {/* :storeID/products/:productID */}
        <Route path="/products" element={<Products />} />
        {/* :storeID/products */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/" element={<Landing />} />

        {/* 404 page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

