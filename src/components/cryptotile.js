import React, { Component } from "react";
import Rating from "./rating";
import Expandable from "./Expandable";
import { CSSTransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";

export default class Cryptotile extends Component {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.state = {
      expanded: false
    };
  }
  expand() {
    this.setState({ expanded: !this.state.expanded });
  }
  componentDidMount() {
    const expandbtn = document.querySelector("#expand");
    expandbtn.addEventListener("click", e =>
      expandbtn.classList.toggle("rotated")
    );
  }

  render() {
    const {
      name,
      price,
      symbol,
      volume,
      marketCap,
      change24h,
      circulatingSupply,
      rank,
      id
    } = this.props;

    return (
      <div id="tile">
        <div id="uppertile" onClick={this.expand}>
          <p>{rank}.</p>

          <Link to={"/" + name.toLowerCase().replace(/\s/g, "-")}>
            {name}({symbol.toUpperCase()})
          </Link>
          <img src={this.props.icon} alt="" id="cryptoIcon" />

          <p title="The total available Supply multiplied by the Price">
            ${Intl.NumberFormat().format(Number(marketCap).toFixed(0))}
          </p>
          <p>
            ${Intl.NumberFormat().format(
              price < 1 ? price : Number(price).toFixed(2)
            )}
          </p>
          <p>
            {Intl.NumberFormat().format(Number(circulatingSupply).toFixed(0))}
          </p>

          {Number(change24h) < 0 ? (
            <p className="red">{Number(change24h).toFixed(2)} %</p>
          ) : (
            <p className="green">{Number(change24h).toFixed(2)} %</p>
          )}

          {this.props.votes[this.props.symbol] ? (
            <div className="votes">
              {Number(this.props.votes[this.props.symbol].voteResult) < 0 ? (
                <p className="red">
                  {this.props.votes[this.props.symbol].voteResult}%
                </p>
              ) : (
                <p className="green">
                  {this.props.votes[this.props.symbol].voteResult}%
                </p>
              )}

              <p>{this.props.votes[this.props.symbol].voteCount}</p>
            </div>
          ) : (
            <div className="votes">
              <p>0%</p>
              <p>0</p>
            </div>
          )}

          <Rating
            handleVote={this.props.handleVote}
            symbol={symbol}
            votes={this.props.votes}
          />
          <Link to={"/" + name.toLowerCase().replace(/\s/g, "-")}>
            <img
              src={
                "https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/" +
                id +
                ".png"
              }
              alt="PriceGraph"
            />
          </Link>
          <button onClick={this.expand} id="expand">
            <i className="fas fa-angle-down" />
          </button>
        </div>
        <CSSTransitionGroup
          transitionName={"fade"}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.state.expanded && (
            <Expandable symbol={symbol} handleVote={this.props.handleVote} />
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}
