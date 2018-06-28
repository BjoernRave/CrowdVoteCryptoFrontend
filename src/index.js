import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import Popup from "react-popup";
import "./popup.css";

ReactDOM.render(
  <div>
    <Popup /> <App />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
