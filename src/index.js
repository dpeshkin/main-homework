import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./components/AppRouter";
import createStore from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";
import "./index.css";
window.Chart = require("chart.js");
const store = createStore();
window.Chart = require("chart.js");
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
