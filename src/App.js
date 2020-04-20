import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndUpPage from "./pages/sign-in-and-up/sign-in-and-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// action creator import
import { setCurrentUser } from "./redux/user/user.action";

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

  // passing this.state.currentUser as props to the Header for Sign In/Out functionality
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndUpPage} />
        </Switch>
      </div>
    );
  }
}

// mapDispatchToProps gets dispatch argument and returns an object with new function that calls dispatch()
// inside itself which is passing result of an acrion creator to every reducer. We invoke action with
// user prop to forward argument to action creator and get the object back (with .payload user)
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// first argument of connect is mapStateToProps, 2nd is mapDispatchToProps
// as we don't need to pass currentUser into App.js anymore 1st argument is null
export default connect(null, mapDispatchToProps)(App);
