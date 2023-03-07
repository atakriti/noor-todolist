import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ContextFun from "./components/ContextFun";
import axios from "axios";

axios.defaults.baseURL = "http://localhost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextFun>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextFun>
);
