import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/flower.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./header.styles.scss";

// props passed bym mapStateToProps
const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {
      // selectively rendering CartDropdown
      hidden ? null : <CartDropdown />
    }
  </div>
);

// mapStateToProps gets needed state(state prop = rootReducer) from rootReducer/xxxxReducer/state
// using advanced destructuring to access nested values to get arguments e.g.
// (state.user.currentUser) === ({user: {currentUser}})
// and in function body we can replace: currentUser: state.user.currentUser with just: currentUser

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

// connect is a HOF, mSTP gives the component props needed
export default connect(mapStateToProps)(Header);
