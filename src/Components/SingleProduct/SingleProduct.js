import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { setProduct } from "../../actions/actionCreator";
import StarRatings from "../Stars/Stars";
import Review from "../Review/Review";
import "./singleCard.css";
import ValidationError from "../ValidationError/ValidationError";

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            token: localStorage.getItem(0),
            reviews: [],
            rating: 5,
            isValid: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getReview();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    getReview = () => {
        const { products } = this.props;
        Axios.get(`http://smktesting.herokuapp.com/api/reviews/${products.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
            this.setState({
                reviews: res.data,
            });
        });
    }

    renderReview = (arr) => arr.map((item) => {
        const {
            // eslint-disable-next-line camelcase
            product, rate, text, created_at, id,
        } = item;
        const time = moment(created_at).format("LLL");
        return (
            <Review
                key = {id}
                product = {product}
                rate = {rate}
                text = {text}
                created_at = {time}
            />
        );
    })

    addInfo = () => {
        const { value, rating } = this.state;
        Axios.post(`http://smktesting.herokuapp.com/api/reviews/${this.props.id}`, JSON.stringify({
            rate: rating,
            text: value,
        }),
        {
            headers: {
                Authorization: `Token ${this.state.token}`,
                "Content-Type": "application/json",
            },
        }).catch(() => {
            this.setState({
                isValid: false,
            });
        });
    }

    render() {
        const { img, title, text } = this.props.products;
        const { reviews, isValid } = this.state;
        let validItem;
        if (isValid === false) {
            validItem = <ValidationError
                text = {"Авторизируйтесь, чтобы оставить отзыв"}
            />;
        }
        const allReviews = this.renderReview(reviews);
        return (
            <div className="full_single_product">
                <div className="single_product">
                    <div className="product_wrapper">
                        <div className="card_header">
                            <img src={img} alt="no-img" className="product_image"/>
                            <div className="card_text">
                                <p className="product_name">{title}</p>
                                <p className="product_info">{text}</p>
                            </div>
                        </div>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="blue"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing="5px"
                            className="stars_rating"
                        />
                        {validItem}
                        <textarea name="" className="textarea_review" id="" value={this.state.value} onChange={this.handleChange} cols="30" rows="5"></textarea>
                        <div className="button_area">
                            <button className="button_review" onClick={this.addInfo}>Отзыв</button>
                        </div>

                    </div>
                    {allReviews}
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    products: state.products,
}), { setProduct })(SingleProduct);

SingleProduct.propTypes = {
    products: PropTypes.object,
    id: PropTypes.number,
};
