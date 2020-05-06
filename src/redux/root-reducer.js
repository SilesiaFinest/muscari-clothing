import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import dirMenuReducer from "./dir-menu/dir-menu.reducer";
import shopReducer from "./shop/shop.reducer";

// configuration of redux-persist (only cart as userAuth being handled by Firebase)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  dirMenu: dirMenuReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
