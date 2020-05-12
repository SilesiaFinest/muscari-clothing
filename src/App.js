import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import SignInAndUpPage from "./pages/sign-in-and-up/sign-in-and-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// action creator & selector import
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selector";

class App extends Component {
  // setting new method so it can be called again for Unmount
  unsubscribeFromAuth = null;

  // using auth from Google Firebase
  // this is a subscription is always open as long App.js is mounted (no need to fetch for user changes)
  componentDidMount() {
    //desctruture action from props
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // userRef returned from createUserProfDoc, returned existing or created a new one
        const userRef = await createUserProfileDocument(userAuth);

        // we would use below method to check if data has changed at this reference
        // in this case we subscribe .onSnaphot to get data related to the user from DB
        // uid is on snapShot itself, user data is on snapShot.data()
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        // if userAuth returned null we set state to null
        // making app aware if user is signed in or not
        setCurrentUser(userAuth);
      }
    });
  }

  // on component Unmount we are calling on this method again so it will close the subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  // in 4th Route we determine if currentUser is signed in. Instead of component='' use render=''
  // it has a function with ternary operator to Redirect back to homepage if user is already signed
  // if not render <signInAndUpPage>

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}
// *************************delete this
// mapStateToProps gets needed state(state prop = rootReducer) from rootReducer/xxxxReducer/state
// using advanced destructuring to access nested values to get arguments e.g.
// (state.user.currentUser) === ({user: {currentUser}})
// and in function body we can replace: currentUser: state.user.currentUser with just: currentUser

//destructure userReducer from state(rootReducer). As a result we receive currentUser prop
// for this component to use and it is equal to user.currentUser value
// *************************end delete

// using createStructuredSelector() if more selectors will be needed in the future,
// just choose correct selector and it will autamatically pass the state to it
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// mapDispatchToProps gets dispatch argument and returns an object with new function that calls dispatch()
// inside itself which is passing result of an action creator to every reducer. (user) is being passed
// to action creator ( as .payload = user). Key is a new name for action, value is imported action
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
