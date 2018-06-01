import React, { PureComponent } from "react";

export default class LoginError extends PureComponent {
  render() {
    return (
      <div className="loginerror">
        <p>You need to be logged in to do that!</p>
      </div>
    );
  }
}
