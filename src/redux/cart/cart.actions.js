import CartActionTypes from "./cart.types";

// not passing .payload values it's not needed for toggle function
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});
