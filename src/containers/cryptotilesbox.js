import React, { Component } from "react";
import { connect } from "react-redux";
import Cryptotile from "../components/cryptotile";
import {
  fetchCryptoStats,
  fetchCryptoVotes
} from "../store/actions/cryptostats";
import { apiCall } from "../services/api";
import { getTags } from "../store/actions/tags";
import LazyLoad from "react-lazyload";
import DescriptionBar from "../components/descriptionBar";
import { StickyContainer, Sticky } from "react-sticky";
let fiatcurr = "USD";
let tiles = [];

for (let i = 0; i < 50; i++) {
  tiles.push(<div key={i} className="placeholder" />);
}

class Cryptotilebox extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
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
    // setInterval(() => {
    //   this.props.fetchCryptoVotes();
    // }, 8000);
  }

  async handleVote(amount, symbol) {
    let response;
    if (this.props.currentUser.isAuthenticated) {
      response = await apiCall("post", "/api/crypto/rating/edit", {
        symbol,
        amount,
        id: this.props.currentUser.user.id
      });
      await this.props.fetchCryptoVotes();
    } else {
      response = await apiCall("post", "/api/crypto/rating/edit", {
        symbol,
        amount,
        id: "IP"
      });

      await this.props.fetchCryptoVotes();
    }

    if (response === "VoteFailed") {
      document.querySelector("#flash").classList.add("flashactive");
      document.querySelector("#flash").textContent =
        "You already voted for this specific currency in the last 12 hours.";
      setTimeout(() => {
        if (document.querySelector("#flash") !== null) {
          document.querySelector("#flash").classList.remove("flashactive");
        }
      }, 3000);
    }

    this.renderTiles();
  }

  handleSorting(param) {
    let sorted = this.state.tiles.sort((a, b) => {
      if (this.state.order) {
        return (
          a.props.children.props.children.props[param] -
          b.props.children.props.children.props[param]
        );
      } else {
        return (
          b.props.children.props.children.props[param] -
          a.props.children.props.children.props[param]
        );
      }
    });

    this.setState({ tiles: sorted, order: !this.state.order }, () => {
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
    });
  }

  handleHover(e) {
    console.log(e.target.offsetLeft);
  }
  goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  renderTiles() {
    tiles = this.props.data.map((data, ind) => (
      <LazyLoad
        key={data.id}
        height={70.7167}
        unmountIfInvisible={true}
        offset={[300, 300]}
        placeholder={
          <div
            id={data.name.toLowerCase().replace(/ /g, "-")}
            className="placeholder"
          />
        }
      >
        <div id={data.name.toLowerCase().replace(/ /g, "-")}>
          <Cryptotile
            id={data.coinmarketid}
            rank={ind + 1}
            name={data.name}
            price={
              data.market_data.current_price[this.props.fiat.fiat.toLowerCase()]
            }
            fiat={this.props.fiat.fiat}
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
    let flash = document.querySelector("#flash");
    setTimeout(() => {
      if (this.props.data.length < 1) {
        flash.textContent =
          "Sorry, for some reason we cannot fetch Cryptocurrency data at this point :(";
        flash.classList.add("flashactive");
      }
    }, 9000);
    if (this.props.data.length > 1 && flash.classList.contains("flashactive")) {
      flash.classList.remove("flashactive");
    }
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
        <StickyContainer>
          <Sticky>
            {({
              style,

              // the following are also available but unused in this example
              isSticky,
              wasSticky,
              distanceFromTop,
              distanceFromBottom,
              calculatedHeight
            }) => (
              <header className="sticky" style={style}>
                <DescriptionBar
                  handleSorting={this.handleSorting}
                  order={this.state.order}
                  handleHover={this.handleHover}
                  fiat={this.props.fiat}
                />
              </header>
            )}
          </Sticky>
          <div className="tilebox">
            {this.state.tiles.length > 2 ? this.state.tiles : tiles}
          </div>
          <a className="goTop" onClick={this.goTop}>
            <i className="fas fa-chevron-circle-up" />
          </a>
        </StickyContainer>
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
