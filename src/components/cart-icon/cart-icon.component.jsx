import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as CartSVG } from "../../assets/cart.svg";

import "./cart-icon.styles.scss";

// after use of connect&mapDispatchToProps {toggleCartHidden} is available as prop on component
// itemCount from mapStateToProps is used to display number of items in the cart
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <CartSVG className="cart-svg" />
    <span className="item-count">{itemCount}</span>
  </div>
);

// using .reduce to get quantity of all items in the cart
const mapStateToProps = ({ cart: { cartItems } }) => ({
  itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
});

// dispatching toggle action
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
