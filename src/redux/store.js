import { createStore, applyMiddleware } from "redux";
// redux-persist used to store function ( to be changed for Firebase DB)
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";

// using redux-logger middleware for help in debugging redux code
import logger from "redux-logger";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

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
sagaMiddleware.run(rootSaga);

// exporting store and persistor to setup redux-persist
export const persistor = persistStore(store);
