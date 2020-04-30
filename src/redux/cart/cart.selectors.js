import { createSelector } from "reselect";

// using reselect lib for momoization
// it prevents React re-rendering components whenever state changes if
// it's not related to the component's state

// first we define an input selector - it's a function that takes whole state
// and return a slice of it (usually one layer deep)
const selectCart = (state) => state.cart;

// output selector takes input selector and {createSelector} to create itself
// first argument it takes is a collection(array) of input selectors
// 2nd arg is a function that returns the value we want from this selector
// orguments of this funcion are values returned from the input selector in order from array
// createSelector makes it memoized(cached)
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// we can use above output selector as an argument for the next output selector
// using .reduce to get quantity of all items in the cart
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((itemSum, item) => itemSum + item.quantity, 0)
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);
