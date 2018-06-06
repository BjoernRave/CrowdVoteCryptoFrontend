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

// const svgs = require.context("../images/cryptoIcons", false, /\.svg$/);
// const svgsObj = svgs.keys().reduce((images, key) => {
//   images[key] = svgs(key);
//   return images;
// }, {});

class Cryptotilebox extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);
    this.handlePag = this.handlePag.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.state = { PagStart: 0, PagEnd: 50, tiles: [], order: false };
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
    this.props.getTags();
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
  handlePag(start, end) {
    this.setState({ PagStart: start, PagEnd: end });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  handleSorting(param) {
    console.log("sorting");
    console.log(this.state.tiles[0].props.children.props);
    let sorted = this.state.tiles.sort((a, b) => {
      if (this.state.order) {
        return a.props.children.props[param] - b.props.children.props[param];
      } else {
        return b.props.children.props[param] - a.props.children.props[param];
      }
    });
    this.setState({ tiles: sorted, order: !this.state.order });
  }

  render() {
    const { data } = this.props;
    if (
      data.length > 0 &&
      this.state.tiles.length < 2 &&
      Object.keys(this.props.votes).length > 1 &&
      this.props.tags.length > 1
    ) {
      let result = data.map((data, ind) => (
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
          />
        </div>
      ));
      this.setState({ tiles: result });
    }

    return (
      <div className="mainpage">
        <div id="namingbar">
          <p onClick={this.handleSorting.bind(this, "rank")}>
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
          <p onClick={this.handleSorting.bind(this, "marketCap")}>
            Market Cap<span>
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
            Price<span>
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
          <p onClick={this.handleSorting.bind(this, "change24h")}>
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
    tags: state.Tags
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
