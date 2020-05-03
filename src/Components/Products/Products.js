/* eslint-disable no-param-reassign */
import React, { Component } from "react";
import Axios from "axios";
import Product from "../Product/Product";
import "./products.css";
import Preloader from "../Preloader/Preloader";

export default class Products extends Component {
    state = {
        products: [],
        isLoading: true,
        token: localStorage.getItem(0),
    }

    getProducts = () => {
        this.setState({ isLoading: true });
        Axios.get("http://smktesting.herokuapp.com/api/products/")
            .then((elem) => {
                elem.data[0].img = "https://i8.rozetka.ua/goods/16286976/copy_lenovo_81mx002sra_5e19b14abd57d_images_16286976595.jpg";
                elem.data[1].img = "https://i2.rozetka.ua/goods/16446855/lenovo_81f8005hra_images_16446855139.jpg";
                this.setState({
                    products: elem.data,
                    isLoading: false,
                });
            })
            .catch();
    }

    componentDidMount() {
        this.getProducts();
    }


    renderProducts = (arr) => arr.map((item) => {
        const {
            id, text, title, img,
        } = item;
        return (
            <Product key={id}
                id={id}
                text={text}
                title={title}
                img={img}
            />
        );
    })

    render() {
        const { products, isLoading } = this.state;
        const items = this.renderProducts(products);
        return (
            <div className="products_wrapper">
                {isLoading && <Preloader />}
                {items}
            </div>
        );
    }
}
