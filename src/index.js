import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import Popup from "react-popup";
import "./popup.css";

ReactDOM.render(
  <div>
    {/* <Popup
      className="mm-popup"
      btnClass="mm-popup__btn"
      closeBtn={true}
      closeHtml={null}
      defaultOk="Ok"
      defaultCancel="Cancel"
      wildClasses={false}
      escToClose={true}
    />{" "} */}
    <App />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
