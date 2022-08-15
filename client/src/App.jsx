import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import logo from "./assets/react.svg";

import Home from "./modules/Home";
import AddUpdateBill from "./modules/AddUpdateBill";
import ViewBill from "./modules/ViewBill";
import Error404Page from "./modules/Error404Page";

const App = () => {
    return (
        <div class="container-fluid p-0">
            <header className="App-header navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar justify-content-center">
                <img src={logo} className="App-logo" alt="logo" height="40px" />
                Electricity Bill
            </header>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/bill/:id" element={<ViewBill />} />
                    <Route path="/addBill" element={<AddUpdateBill />} />
                    <Route path="/notfound" element={<Error404Page />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
