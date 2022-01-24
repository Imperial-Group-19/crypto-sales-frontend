import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Landing from './pages/Landing';
import Payment from './pages/Payment';
import Products from './pages/Products';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

