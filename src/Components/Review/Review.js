import React, { Component } from "react";
import PropTypes from "prop-types";
import "./review.css";

export default class Review extends Component {
    render() {
        const { rate, text, createdAt } = this.props;
        return (
            <div className="review_wrapper">
                <p>{`Создан: ${createdAt}`}</p>
                <p>{`Оценка: ${rate}`}</p>
                <p>{`Отзыв: ${text}`}</p>
            </div>
        );
    }
}

Review.propTypes = {
    rate: PropTypes.number,
    text: PropTypes.string,
    createdAt: PropTypes.string,
};
