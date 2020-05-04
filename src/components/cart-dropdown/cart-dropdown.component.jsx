import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

// cartItems passed from stateToProps/ history from withRouter
// onClick pushing function to go to history.push('/checkout')
// and dispatch shorthand for toggleCartHidden action creator
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

// using memoized cartItems selector
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

//withRouter (HOC) is taking component as an argument
//argument being component returned from connect()

// connect passes dispatch as props automatically if we don't declare 2nd argument
export default withRouter(connect(mapStateToProps)(CartDropdown));
