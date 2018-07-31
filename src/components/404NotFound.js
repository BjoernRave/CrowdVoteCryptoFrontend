import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div className="fourofour">
        <h2>Error: 404</h2>
        <p>Sorry, we could not find what you were looking for</p>
        <p>
          Just go back to the main page <Link to="/">here</Link>
        </p>
      </div>
    );
  }
}
