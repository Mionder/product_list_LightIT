/* eslint-disable linebreak-style */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import "./App.css";
import Header from "./Components/Header/Header";
import Products from "./Components/Products/Products";
import Footer from "./Components/Footer/Footer";
import SingleProduct from "./Components/SingleProduct/SingleProduct";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Route path="/login" component={Login} exact/>
                <Route path="/" component={Products} exact/>
                <Route path="/product/:id" component={SingleProduct} exact/>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
