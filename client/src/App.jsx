import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import logo from "./assets/react.svg";

const App = () => {
    return (
        <div class="container-fluid p-0">
            <header className="App-header navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
                <img src={logo} className="App-logo" alt="logo" height="40px" />
                React Electricity App
            </header>
        </div>
    );
};

export default App;
