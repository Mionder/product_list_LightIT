import React, { Component } from "react";
import PropTypes from "prop-types";
import "./input.css";

export default class Input extends Component {
    render() {
        const {
            type, value, onChange,
        } = this.props;
        return (
            <div>
                <input className = "inputs"
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};
