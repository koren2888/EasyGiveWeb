import React, { useContext, useState, useEffect } from "react";
import "./Products.css";
import Card from "../../components/Card/Card";

export default function Products(props) {
  return (
    <>
      <div className="product-container">
        {props.products.length > 0 ? (
          props.products.map((product) => <Card key={product.id} {...product} addToCart={() => props.addToCart(product)} />)
        ) : (
          <div className="not_products">
            <img
              className="products_empty_img"
              src="images/bare-tree.png"
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
}
