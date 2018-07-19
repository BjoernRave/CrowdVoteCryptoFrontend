import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>Copyright © 2018 CrowdVoteCrypto</p>
        <a href="mailto:enterravement@gmail.com">
          <p>enterravement@gmail.com</p>
        </a>
        <Link to="/privacy-policy">
          {" "}
          <p>Privacy Policy </p>
        </Link>
        <Link to="/cookie-policy">
          {" "}
          <p>Cookie Policy </p>
        </Link>
        <section>
          Cryptocurrency Data provided by :{" "}
          <a target="_blank" href="https://coinmarketcap.com/">
            CoinMarketCap
          </a>{" "}
          and{" "}
          <a target="_blank" href="https://www.coingecko.com/">
            Coin Gecko
          </a>
        </section>
      </div>
    );
  }
}
