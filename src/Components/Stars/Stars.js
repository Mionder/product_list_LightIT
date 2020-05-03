import React, { Component } from "react";

import StarRatings from "react-star-ratings";

export default class Stars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 2,
        };
    }


    changeRating = (newRating) => {
        this.setState({
            rating: newRating,
        });
        localStorage.setItem(2, this.state.rating);
    }


    render() {
        return (
            <StarRatings
                rating={this.state.rating}
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="5px"
            />
        );
    }
}
