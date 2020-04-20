import { createStore, applyMiddleware } from "redux";

// using redux-logger middleware for help in debugging redux code
import logger from "redux-logger";

import rootReducer from "./root-reducer";

//setting up middlewares array
const middlewares = [logger];

// createStore gets rootReducer and return value of applyMiddlware so it's scalable in future
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
