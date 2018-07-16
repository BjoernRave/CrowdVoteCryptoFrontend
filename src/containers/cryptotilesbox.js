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
import LazyLoad from "react-lazyload";
import DescriptionBar from "../components/descriptionBar";

// const svgs = require.context("../images/cryptoIcons", false, /\.svg$/);
// const svgsObj = svgs.keys().reduce((images, key) => {
//   images[key] = svgs(key);
//   return images;
// }, {});
let fiatcurr = "USD";
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
    this.state = {
      PagStart: 0,
      PagEnd: 50,
      tiles: [],
      order: false,
      descriptionHover: false
    };
  }
  componentWillMount() {
    this.props.fetchCryptoStats();
    this.props.fetchCryptoVotes();
    this.props.getTags();
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
    const myFunction = () => {
      if (window.pageYOffset >= sticky) {
        this.setState({ descriptionHover: true });
      } else {
        this.setState({ descriptionHover: false });
      }
    };

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
      <LazyLoad
        height={75}
        unmountIfInvisible={true}
        offset={[300, 300]}
        placeholder={
          <div
            id={data.name.toLowerCase().replace(/ /g, "")}
            className="placeholder"
          />
        }
      >
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
      </LazyLoad>
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
        {/* {this.state.descriptionHover && (
          <DescriptionBar
            className="sticky"
            handleSorting={this.handleSorting}
            order={this.state.order}
            handleHover={this.handleHover}
            fiat={this.props.fiat}
          />
        )} */}
        <DescriptionBar
          handleSorting={this.handleSorting}
          order={this.state.order}
          handleHover={this.handleHover}
          fiat={this.props.fiat}
        />
        <div className="tilebox">{this.state.tiles}</div>
        {/* <div className="pagbtn">
          <button onClick={() => this.handlePag(0, 50)}>1</button>
          <button onClick={() => this.handlePag(50, 100)}>2</button>
          <button onClick={() => this.handlePag(100, 150)}>3</button>
        </div> */}
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
