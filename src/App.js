import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Landing from './pages/Landing';
import Payment from './pages/Payment';
import Products from './pages/Products';
import Confirmation from './pages/Confirmation';
import MerchantDashboard from "./pages/MerchantDashboard";

// Web sockets
const client = new W3CWebSocket("ws://127.0.0.1:5000");

export default function App() {
  client.onopen = () => {
    console.log("WebSocket Client Connected");
  };
  client.onmessage = (message) => {
    console.log(message);
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="/merchant/register" element={<Register />}></Route> */} // Register
        <Route path="/merchant/login" element={<Login />}></Route> // Login
        {/* <Route path="/merchant/dashboard" element={<Stores />}></Route> */} // Main Dashboard (list of stores)
        {/* <Route path="/merchant/new-store" element={<NewStore />}></Route> */} // New store
        {/* <Route path="/merchant/:storeID" element={<StoreDashboard />}></Route> */} // Store Dasboard (list of products)
        {/* <Route path="/merchant/:storeID/new-product" element={<NewProduct />}></Route> */} // New Product

        <Route path="/landing" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/store/:shopId" element={<MerchantDashboard/>} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

