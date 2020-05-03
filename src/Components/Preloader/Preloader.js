import React from "react";
import "./preloader.css";

export default function Preloader() {
    window.onload = () => {
        document.body.classList.add("loaded_hiding");
        window.setTimeout(() => {
            document.body.classList.add("loaded");
            document.body.classList.remove("loaded_hiding");
        }, 500);
    };

    return (
        <div className="preloader">
            <div className="preloader__image"></div>
        </div>
    );
}
