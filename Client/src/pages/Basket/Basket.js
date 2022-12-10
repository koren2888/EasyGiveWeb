import React, { useState } from "react";
import "./Basket.css";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import BasketItem from "../../components/BasketItem/BasketItem.jsx";
import axios from 'axios'

export default function Basket(props) {
  const [didSubmitOrder, setDidSubmitOrder] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const calculatePrice = () => {
    return props.cartProducts.reduce((sum, product) => sum += parseFloat(product.price), 0).toFixed(2)
  }

  const makePurchase = () => {
    const buyerInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address
    }

    const purchaseInfo = {
      products: props.cartProducts,
      buyerInfo: buyerInfo
    }

    axios.post("http://localhost:3001/purchase", purchaseInfo)
    setDidSubmitOrder(true)
    props.emptyCart()
  }

  return (
    <>
      <div className="favorite_container_linkBar">
        <div className="favorite_linkBar">
          <span>Cart</span>
          <Link className="favorite_backLink" to={"/"}>
            <HiArrowRight />
            Back to products
          </Link>
        </div>
      </div>
      {props.cartProducts.length > 0 ? (
        <div className="basket_container">
          <div className="basket_itemBox">
            {props.cartProducts.map((product) => (
              <BasketItem key={product._id} {...product} />
            ))}
          </div>
          <div className="basket_priceBox">
            <div className="basket_send">
              <span>Shopping Cart Total</span>
              <span>{calculatePrice()} USD$</span>
            </div>
            
            <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Shipping Address" value={address} onChange={(e) => setAddress(e.target.value)}/>

            <button onClick={makePurchase} className="basket_button_buy">Submit Order</button>
            <button
              onClick={props.emptyCart}
              className="basket_button_remove"
            >
              Remove all products from cart
            </button>
          </div>
        </div>
      ) : (
        <div className="favorite_empty">
          {didSubmitOrder ?
            <span className="favorite_empty_title">Your purchase was successful. We hope you purchase again</span>
            :
            <><img
              className="favorite_empty_img"
              src="images/empty-cart.png"
              alt=""
            />
              <span className="favorite_empty_title">Your shopping cart is empty</span>
            </>}
        </div>
      )}
    </>
  );
}
