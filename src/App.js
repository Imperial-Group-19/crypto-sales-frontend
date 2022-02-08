import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Landing from './pages/Landing';
import Payment from './pages/Payment';
import Products from './pages/Products';
import Confirmation from './pages/Confirmation';
import Register from "./store/pages/Register";
import Login from "./store/pages/Login";
import MerchantDashboard from "./pages/MerchantDashboard";
import Stores from "./store/pages/Stores";


// Web sockets
// const client = new W3CWebSocket("ws://127.0.0.1:5000");

export default function App() {
  // client.onopen = () => {
  //   console.log("WebSocket Client Connected");
  // };
  // client.onmessage = (message) => {
  //   console.log(message);
  // };

  return (
    <Router>
      <Routes>
        <Route path="/merchant/register" element={<Register />}/>
        <Route path="/merchant/login" element={<Login />} />
        <Route path="/merchant/stores" element={<Stores />}/>
        {/* <Route path="/merchant/new-store" element={<NewStore />}></Route> */} 
        {/* <Route path="/merchant/:storeID" element={<StoreDashboard />}></Route> */}
        {/* <Route path="/merchant/:storeID/products" element={<NewProduct />}></Route> */} 
        {/* <Route path="/merchant/:storeID/new-product" element={<NewProduct />}></Route> */} 

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

