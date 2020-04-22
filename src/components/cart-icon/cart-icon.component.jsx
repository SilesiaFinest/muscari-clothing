import React from "react";

import { ReactComponent as CartSVG } from "../../assets/cart.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => (
  <div className="cart-icon">
    <CartSVG className="cart-svg" />
    <span className="item-count">0</span>
  </div>
);

export default CartIcon;
