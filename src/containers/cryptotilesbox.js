import React, { Component } from "react";
import { connect } from "react-redux";
import Cryptotile from "../components/cryptotile";
import {
  fetchCryptoStats,
  fetchCryptoVotes
} from "../store/actions/cryptostats";
import { apiCall } from "../services/api";

// const svgs = require.context("../images/cryptoIcons", false, /\.svg$/);
// const svgsObj = svgs.keys().reduce((images, key) => {
//   images[key] = svgs(key);
//   return images;
// }, {});

class Cryptotilebox extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    this.props.fetchCryptoStats();
    window.onscroll = function() {
      myFunction();
    };
    var header = document.getElementById("namingbar");
    var sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    this.props.fetchCryptoVotes();
    // setInterval(() => {
    //   this.props.fetchCryptoVotes();
    // }, 8000);
  }

  handleVote(amount, symbol) {
    if (this.props.currentUser.isAuthenticated) {
      let data = { symbol, amount };
      apiCall("put", "/api/crypto/rating/edit", data);
      this.props.fetchCryptoVotes();
    } else {
      document.querySelector("#flash").classList.add("flashactive");
      setTimeout(() => {
        if (document.querySelector("#flash") !== null) {
          document.querySelector("#flash").classList.remove("flashactive");
        }
      }, 3000);
    }
  }

  render() {
    const { data } = this.props;
    let result = [];
    let rank = 0;
    if (data.length > 0) {
      result = data.map((data, ind) => (
        <div key={data.id} id={data.name.toLowerCase().replace(/ /g, "")}>
          <Cryptotile
            id={data.coinmarketid}
            rank={ind + 1}
            name={data.name}
            price={data.market_data.current_price.usd}
            symbol={data.symbol}
            volume={data.volume_24h}
            marketCap={data.market_data.market_cap.usd}
            change24h={data.market_data.price_change_percentage_24h}
            circulatingSupply={data.market_data.circulating_supply}
            handleVote={this.handleVote}
            votes={this.props.votes}
            icon={data.image.small}
          />
        </div>
      ));
    }

    return (
      <div className="mainpage">
        <div id="namingbar">
          <p>#</p>
          <p>Name</p>
          <p title="The total available Supply multiplied by the Price">
            {" "}
            Market Cap
          </p>
          <p>Price</p>
          <p>Circulating Supply</p>
          <p>Change(24h)</p>
          <div id="voteshow">
            <p>Estimated Change(24h)</p>
            <p>Number of Votes</p>
          </div>
          <div />
          <p>Price Graph(7d)</p>

          <div />
        </div>

        <div className="tilebox">{result.slice(0, 100)} </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    data: state.cryptodata,
    votes: state.cryptovotes,
    currentUser: state.currentUser
  };
}

export default connect(mapStatetoProps, {
  fetchCryptoStats,
  fetchCryptoVotes
})(Cryptotilebox);
