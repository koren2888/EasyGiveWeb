import React, { useContext, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div key={props._id} className="box">
      <Link to={`/${props._id}`}>
        <img className="product_img" src={props.imagePath} alt="product" />
        <div className="content">
          <div className="title">
            <span>{props.name}</span>
          </div>
          <div className="price">
            <span>{props.price} USD$</span>
          </div>
          <div className="description">
            <span>{props.description}</span>
          </div>
        </div>
      </Link>
        <button
          onClick={props.addToCart}
          className="products_button buy_button"
        >
          Add To Cart
          <FiShoppingCart className="buy_icon" />
        </button>
    </div>
  );
}
