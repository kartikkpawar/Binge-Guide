import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./app/store";
import { Provider } from "react-redux";
import RoutesManager from "./routes";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RoutesManager />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
