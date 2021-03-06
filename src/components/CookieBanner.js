import React from "react";
import { Link } from "react-router-dom";

export default props => {
  return (
    <div className="cookiebanner">
      <p>
        We use cookies and other tracking technologies to improve your browsing
        experience on our website,to analyze our website traffic, and to
        understand where our visitors are coming from. By browsing our website,
        you consent to our use of cookies and other tracking technologies.
      </p>
      <div>
        <Link to="/cookie-policy">
          <p>Cookie Policy</p>
        </Link>
        <button onClick={props.handleAgree}>I Agree!</button>
        <Link to="/privacy-policy">
          <p>Privacy Policy</p>
        </Link>
      </div>
    </div>
  );
};
