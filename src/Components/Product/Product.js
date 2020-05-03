import React, { Component } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./Card/card.css";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ValidationError from "../ValidationError/ValidationError";
import { setProduct } from "../../actions/actionCreator";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            token: localStorage.getItem(0),
            reviews: [],
            rating: 5,
        };
        this.handleChange = this.handleChange.bind(this);
    }

      changeRating = (newRating) => {
          this.setState({
              rating: newRating,
          });
      }

      handleChange(event) {
          this.setState({ value: event.target.value });
      }

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
                isError: true,
                isValid: false,
            });
        });
    }

    loadDetails = () => {
        const {
            // eslint-disable-next-line no-shadow
            title, text, img, id, setProduct,
        } = this.props;
        setProduct(id, title, img, text);
    }

    render() {
        const { isValid } = this.state;
        const {
            title, text, img, id,
        } = this.props;
        let validItem;
        if (isValid === false) {
            validItem = <ValidationError
                text = {"Авторизируйтесь, чтобы оставить отзыв"}
            />;
        }
        return (
            <div className="product_card">
                <div className="product_wrapper">
                    <img src={img} alt="no-img" className="product_image"/>
                    <div className="card_text">
                        <p className="product_name">{title}</p>
                        <p className="product_info">{text}</p>
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
                        <Link to={{
                            pathname: `/product/${id}`,
                            propsSearch: id,
                        }}><button className="button_review" onClick={this.loadDetails}>Подробнее</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    products: state.products,
}), { setProduct })(Product);

Product.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    img: PropTypes.string,
    id: PropTypes.number,
    setProduct: PropTypes.func,
};
