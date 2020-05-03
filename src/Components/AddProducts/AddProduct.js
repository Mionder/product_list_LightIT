import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class AddProduct extends Component {
    addProduct = () => {
        const arrProduct = [
            {
                id: 5152,
                title: "Ноутбук Asus X543MA-GQ496",
                img: "https://i1.rozetka.ua/goods/12583916/asus_90nb0ir6_m13660_images_12583916614.jpg",
                text: "'Экран 15.6' (1366x768) HD, матовый / Intel Celeron N4000 (1.1 - 2.6 ГГц) / RAM 4 ГБ / HDD 500 ГБ / Intel UHD Graphics 600",
            },
            {
                id: 5111,
                title: "Ноутбук Apple MacBook Air 13''",
                img: "https://i8.rozetka.ua/goods/17747568/apple_macbook_air_2020_256_silver_images_17747568883.jpg",
                text: "'Экран 13.3' IPS (2560x1600), глянцевый / Intel Core i3 (1.1 - 3.2 ГГц) / RAM 8 ГБ / SSD 256 ГБ / Intel Iris Plus Graphics / Wi-Fi / Bluetooth / macOS Catalina / 1.29 кг / серебристый",
            },
            {
                id: 6000,
                title: "Ноутбук Apple MacBook Pro 13''",
                img: "https://i2.rozetka.ua/goods/17139082/191234625_images_17139082248.jpg",
                text: "'Экран 13.3' IPS (2560x1600), глянцевый / Intel Core i5-8257U (1.4 - 3.9 ГГц) / RAM 8 ГБ / SSD 128 ГБ / Intel Iris Plus Graphics 645 / Wi-Fi / Bluetooth / macOS Mojave / 1.37 кг / серый",
            },
        ];
        arrProduct.forEach((element) => {
            Axios.post("http://smktesting.herokuapp.com/api/products/", JSON.stringify(
                element,
            ),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        });
    }

    render() {
        return (
            <div>
                <Link to="/"><p className="menu_header" onClick={this.addProduct}>Добавить товары</p></Link>
            </div>
        );
    }
}
