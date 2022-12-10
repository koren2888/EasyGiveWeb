import React, { useContext, useEffect, useRef } from "react";
import "./Header.css";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

function Header(props) {

  // run only if state changes and Not Mount
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      setTimeout(() => {
      }, 1000);
    } else {
      didMount.current = true;
    }
  }, [props.cartProducts]);

  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"} className="logo">
          Household Product Shop
        </Link>
        <div className="basket-icon">
          <Link to={"/basket"} className="shoppe_icon_box">
            <AiOutlineShopping className="shop_icon" />
            {props.cartProducts.length > 0 && (
              <span className="badge_shope">{props.cartProducts.length}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
