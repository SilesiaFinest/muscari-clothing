import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as CartSVG } from "../../assets/cart.svg";

import "./cart-icon.styles.scss";

// after use of connect&mapDispatchToProps {toggleCartHidden} is available as prop on component
const CartIcon = ({ toggleCartHidden }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <CartSVG className="cart-svg" />
    <span className="item-count">0</span>
  </div>
);

// dispatching toggle action
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
