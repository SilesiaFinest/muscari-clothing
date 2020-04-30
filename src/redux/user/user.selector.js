import { createSelector } from "reselect";

// using reselect lib for momoization
// more info in cart.selector
const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
