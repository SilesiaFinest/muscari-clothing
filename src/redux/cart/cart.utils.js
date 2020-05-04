// utils is storing functions that nay be needed in multiple files

// addItemToCart takes 2 arguments, current cartItems array and a new item to be added
// it checks if new item exists in the array
export const addItemToCart = (cartItems, cartItemtoAdd) => {
  // if item exists in the array existingCartItem will be true (undefinded if not)
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemtoAdd.id
  );

  // if true cartItems.map is run and returns a new array. Returning a new array instead of
  // updating the prevState to make sure the component is re-rendered
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemtoAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // above if block of code is run only when we are adding a new item, if not we use a below
  // return statement which returns a new array with all existing cartItems and adding a
  // new object equal to cartItemToAdd with added base quantity of 1
  return [...cartItems, { ...cartItemtoAdd, quantity: 1 }];
};

// removeItemFromCart
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // check if item exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // if existingCartItem quantity is 1 - clear the item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // decrease the quantity if it's > 1
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
