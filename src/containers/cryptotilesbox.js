import React, { Component } from "react";
import { connect } from "react-redux";
import Cryptotile from "../components/cryptotile";
import {
  fetchCryptoStats,
  fetchCryptoVotes
} from "../store/actions/cryptostats";
import { apiCall } from "../services/api";
import Footer from "../components/footer";
import { getTags } from "../store/actions/tags";
import Popup from "react-popup";
import Cookies from "universal-cookie";

// const svgs = require.context("../images/cryptoIcons", false, /\.svg$/);
// const svgsObj = svgs.keys().reduce((images, key) => {
//   images[key] = svgs(key);
//   return images;
// }, {});
let fiatcurr = "USD";
let coinlinks = {};
const cookies = new Cookies();

class Cryptotilebox extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.handlePag = this.handlePag.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
    this.goTop = this.goTop.bind(this);
    this.state = { PagStart: 0, PagEnd: 50, tiles: [], order: false };
  }
  componentWillMount() {
    this.props.fetchCryptoStats();
    this.props.fetchCryptoVotes();
    this.props.getTags();
    fetch("../../public/coinlinks.json")
      .then(res => res.json())
      .then(res => {
        coinlinks = res;
      });
  }

  componentDidMount() {
    console.log(cookies.get("firsttime"));
    if (cookies.get("firsttime") !== "true") {
      Popup.create({
        title: "Welcome on CrowdVoteCrypto!",
        content: (
          <div>
            The place to understand how the future of your cryptocurrency will
            look like
          </div>
        ),
        className: "alert",
        buttons: {
          left: [
            {
              text: "Ok!",
              className: "success",
              action: function() {
                Popup.close();
                cookies.set("firsttime", true, {
                  path: "/",
                  expires: new Date(2048, 11, 24)
                });
              }
            }
          ]
        }
      });
      Popup.create({
        title: "Welcome on CrowdVoteCrypto!",
        content: <div>Let me introduce you to the concept</div>,
        className: "alert",
        buttons: {
          left: [
            {
              text: "Ok!",
              className: "success",
              action: function() {
                Popup.close();
                cookies.set("firsttime", true, {
                  path: "/",
                  expires: new Date(2048, 11, 24)
                });
              }
            }
          ]
        }
      });
    }

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

    // setInterval(() => {
    //   this.props.fetchCryptoVotes();
    // }, 8000);
  }

  async handleVote(amount, symbol) {
    if (this.props.currentUser.isAuthenticated) {
      await apiCall("post", "/api/crypto/rating/edit", {
        symbol,
        amount,
        id: this.props.currentUser.user.id
      });
      await this.props.fetchCryptoVotes();
    } else {
      document.querySelector("#flash").classList.add("flashactive");
      setTimeout(() => {
        if (document.querySelector("#flash") !== null) {
          document.querySelector("#flash").classList.remove("flashactive");
        }
      }, 3000);
    }
    this.renderTiles();
  }
  handlePag(start, end) {
    this.setState({ PagStart: start, PagEnd: end });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  handleSorting(param) {
    let sorted = this.state.tiles.sort((a, b) => {
      if (this.state.order) {
        return a.props.children.props[param] - b.props.children.props[param];
      } else {
        return b.props.children.props[param] - a.props.children.props[param];
      }
    });

    this.setState({ tiles: sorted, order: !this.state.order });
  }

  handleHover(e) {
    console.log(e.target.offsetLeft);
  }
  goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  renderTiles() {
    const { data } = this.props;

    console.log("list rendered");
    let tiles = data.map((data, ind) => (
      <div key={data.id} id={data.name.toLowerCase().replace(/ /g, "")}>
        <Cryptotile
          id={data.coinmarketid}
          rank={ind + 1}
          name={data.name}
          price={
            data.market_data.current_price[this.props.fiat.fiat.toLowerCase()]
          }
          symbol={data.symbol}
          marketCap={
            data.market_data.market_cap[this.props.fiat.fiat.toLowerCase()]
          }
          change24h={data.market_data.price_change_percentage_24h}
          circulatingSupply={data.market_data.circulating_supply}
          handleVote={this.handleVote}
          voteCount={
            this.props.votes[data.symbol] === undefined
              ? 0
              : this.props.votes[data.symbol].voteCount
          }
          voteResult={
            this.props.votes[data.symbol] === undefined
              ? 0
              : this.props.votes[data.symbol].voteResult
          }
          icon={data.image.small}
          tags={this.props.tags}
          currency={this.props.fiat}
        />
      </div>
    ));
    this.setState({ tiles });
  }

  render() {
    if (
      this.props.data.length > 0 &&
      this.state.tiles.length < 2 &&
      Object.keys(this.props.votes).length > 0 &&
      this.props.tags.length > 0 &&
      this.props.fiat.fiat !== undefined
    ) {
      this.renderTiles();
    }

    if (fiatcurr !== this.props.fiat.fiat) {
      this.renderTiles();
    }
    fiatcurr = this.props.fiat.fiat;

    return (
      <div className="mainpage">
        <div id="namingbar">
          <p
            onMouseOver={this.handleHover}
            onClick={this.handleSorting.bind(this, "rank")}
          >
            #<span>
              <i
                className={
                  !this.state.order
                    ? "fas fa-sort-up rotated"
                    : "fas fa-sort-up"
                }
              />
            </span>
          </p>
          <p>Name</p>
          <p
            onMouseOver={this.handleHover}
            onClick={this.handleSorting.bind(this, "marketCap")}
          >
            Market Cap in {this.props.fiat.fiat}
            <span>
              <i
                className={
                  !this.state.order
                    ? "fas fa-sort-up rotated"
                    : "fas fa-sort-up"
                }
              />
            </span>
          </p>

          <p onClick={this.handleSorting.bind(this, "price")}>
            Price in {this.props.fiat.fiat}
            <span>
              <i
                className={
                  !this.state.order
                    ? "fas fa-sort-up rotated"
                    : "fas fa-sort-up"
                }
              />
            </span>
          </p>
          <p onClick={this.handleSorting.bind(this, "circulatingSupply")}>
            Circulating Supply<span>
              <i
                className={
                  !this.state.order
                    ? "fas fa-sort-up rotated"
                    : "fas fa-sort-up"
                }
              />
            </span>
          </p>
          <p
            onMouseOver={this.handleHover}
            onClick={this.handleSorting.bind(this, "change24h")}
          >
            Change(24h)<span>
              <i
                className={
                  !this.state.order
                    ? "fas fa-sort-up rotated"
                    : "fas fa-sort-up"
                }
              />
            </span>
          </p>
          <p onClick={this.handleSorting.bind(this, "voteResult")}>
            Estimated Change(24h)<span>
              <i
                className={
                  !this.state.order
                    ? "fas fa-sort-up rotated"
                    : "fas fa-sort-up"
                }
              />
            </span>
          </p>
          <p onClick={this.handleSorting.bind(this, "voteCount")}>
            Number of Votes<span>
              <i
                className={
                  !this.state.order
                    ? "fas fa-sort-up rotated"
                    : "fas fa-sort-up"
                }
              />
            </span>
          </p>

          <div />
          <p>Price Graph(7d)</p>

          <div />
        </div>
        <div className="tilebox">
          {this.state.tiles.slice(this.state.PagStart, this.state.PagEnd)}
        </div>
        <div className="pagbtn">
          <button onClick={() => this.handlePag(0, 50)}>1</button>
          <button onClick={() => this.handlePag(50, 100)}>2</button>
          <button onClick={() => this.handlePag(100, 150)}>3</button>
        </div>
        <a className="goTop" onClick={this.goTop}>
          <i className="fas fa-chevron-circle-up" />
        </a>
        <Footer />
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    data: state.cryptodata,
    votes: state.cryptovotes,
    currentUser: state.currentUser,
    tags: state.Tags,
    fiat: state.fiatCurrency
  };
}

export default connect(
  mapStatetoProps,
  {
    fetchCryptoStats,
    fetchCryptoVotes,
    getTags
  }
)(Cryptotilebox);
