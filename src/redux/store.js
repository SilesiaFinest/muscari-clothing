import { createStore, applyMiddleware } from "redux";
// redux-persist used to store function ( to be changed for Firebase DB)
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import { fetchCollectionsStart } from "./shop/shop.sagas";

// using redux-logger middleware for help in debugging redux code
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// create Sagas here (to be added in middlewares array)
const sagaMiddleware = createSagaMiddleware();

// setting up middlewares array with sagas added
const middlewares = [sagaMiddleware];

// if app in development add logger middleware
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// createStore gets rootReducer and return value of applyMiddlware so it's scalable in future
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// run sagaMiddlewares
sagaMiddleware.run(fetchCollectionsStart);

// exporting store and persistor to setup redux-persist
export const persistor = persistStore(store);
