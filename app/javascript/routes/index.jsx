import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Products";
import ProtectedRoute from "./ProtectedRoute";


export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
}