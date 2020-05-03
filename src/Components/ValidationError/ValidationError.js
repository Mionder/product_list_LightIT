import React, { Component } from "react";
import PropTypes from "prop-types";
import "./validation.css";

export default class ValidationError extends Component {
    render() {
        const { text, type } = this.props;
        return (
            <div className={ type === "success" ? "validation__panel success" : "validation__panel"}>{text}</div>
        );
    }
}

ValidationError.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
};
