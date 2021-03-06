import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assets/flower.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.actions";

import * as sc from "./header.styles";

// props passed by mapStateToProps
const Header = ({ currentUser, hidden, signOutStart }) => (
  <sc.HeaderContainer>
    <sc.LogoContainer to="/">
      <Logo className="logo" />
    </sc.LogoContainer>
    <sc.OptionsContainer>
      <sc.OptionLink to="/shop">SHOP</sc.OptionLink>
      <sc.OptionLink to="/contact">CONTACT</sc.OptionLink>
      {currentUser ? (
        <sc.OptionLink as="div" onClick={signOutStart}>
          SIGN OUT
        </sc.OptionLink>
      ) : (
        <sc.OptionLink to="/signin">SIGN IN</sc.OptionLink>
      )}
      <CartIcon />
    </sc.OptionsContainer>
    {
      // selectively rendering CartDropdown
      hidden ? null : <CartDropdown />
    }
  </sc.HeaderContainer>
);

// using createStructuredSelector() to avoid repetitions when declaring selectors e.g.
// (currentUser: selectCurrentUser(state), hidden: selectCartHidden(state)) is replaced by:
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

// connect is a HOF, mSTP gives the component props needed
export default connect(mapStateToProps, mapDispatchToProps)(Header);
