import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

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

// createStructuredSelector passes whole state to the selectors
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

// dispatching toggle action
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
