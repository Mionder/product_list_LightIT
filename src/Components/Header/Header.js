import React, { Component } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddProduct from "../AddProducts/AddProduct";
import { setUser } from "../../actions/actionCreator";

class Header extends Component {
    state = {
        username: localStorage.getItem(1),
    }

    logOut = () => {
        localStorage.setItem(0, "");
        localStorage.setItem(1, undefined);
        localStorage.setItem(2, "");
    }

    render() {
        const { username } = this.state;
        return (
            <header className="header">
                <div className="container">
                    <nav>
                        <ul className="header_wrapper">
                            <AddProduct />
                            <Link to="/"><li className="menu_header">Список товаров</li></Link>
                            <Link className="navigation_user" to="/login"><li className="menu_header">{username !== "undefined" ? `Привет, ${username}` : "Авторизация"}</li>
                                <span onClick={this.logOut} className="log__out">{username !== "undefined" ? "(выйти)" : ""}</span></Link>


                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default connect((state) => ({
    user: state.user,
}), { setUser })(Header);

Header.propTypes = {
    user: PropTypes.object,
};
