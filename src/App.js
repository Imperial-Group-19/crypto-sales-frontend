import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Landing from './pages/Landing';
import Payment from './pages/Payment';
import Products from './pages/Products';
import Confirmation from './pages/Confirmation';

// Web sockets
// const client = new W3CWebSocket("ws://127.0.0.1:8000");

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
        <Route path="/landing" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

