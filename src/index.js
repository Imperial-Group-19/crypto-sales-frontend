import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import store from "./store";

import { Web3ContextProvider } from "./merchant/features/Web3Context";

ReactDOM.render(
  <Web3ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </Web3ContextProvider>,
  document.getElementById("root")
);
