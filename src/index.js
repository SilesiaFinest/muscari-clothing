import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

// using StrictMode added in React 16.3 to aid debugging the app
// App wrapped in Provider setting up redux store to be accessable from any component

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
