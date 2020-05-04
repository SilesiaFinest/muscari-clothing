import { createStore, applyMiddleware } from "redux";
// redux-persist user to store function ( to be changed for Firebase DB)
import { persistStore } from "redux-persist";

// using redux-logger middleware for help in debugging redux code
import logger from "redux-logger";

import rootReducer from "./root-reducer";

//setting up middlewares array
const middlewares = [logger];

// createStore gets rootReducer and return value of applyMiddlware so it's scalable in future
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// exporting store and persistor to setup redux-persist
export const persistor = persistStore(store);
