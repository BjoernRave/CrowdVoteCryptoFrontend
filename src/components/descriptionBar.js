import React, { Component } from "react";

export default class DescriptionBar extends Component {
  componentDidMount() {}
  render() {
    const { handleSorting, handleHover, order } = this.props;
    return (
      <div id="namingbar">
        <p onMouseOver={handleHover} onClick={handleSorting.bind(this, "rank")}>
          #<span>
            <i
              className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"}
            />
          </span>
        </p>
        <p>Name</p>
        <p
          onMouseOver={handleHover}
          onClick={handleSorting.bind(this, "marketCap")}
        >
          Market Cap in {this.props.fiat.fiat}
          <span>
            <i
              className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"}
            />
          </span>
        </p>

        <p onClick={handleSorting.bind(this, "price")}>
          Price in {this.props.fiat.fiat}
          <span>
            <i
              className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"}
            />
          </span>
        </p>
        <p onClick={handleSorting.bind(this, "circulatingSupply")}>
          Circulating Supply<span>
            <i
              className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"}
            />
          </span>
        </p>
        <p
          onMouseOver={handleHover}
          onClick={handleSorting.bind(this, "change24h")}
        >
          Change(24h)<span>
            <i
              className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"}
            />
          </span>
        </p>
        <p onClick={handleSorting.bind(this, "voteResult")}>
          Estimated Change(24h)<span>
            <i
              className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"}
            />
          </span>
        </p>
        <p onClick={handleSorting.bind(this, "voteCount")}>
          Number of Votes<span>
            <i
              className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"}
            />
          </span>
        </p>

        <div />
        <p>Price Graph(7d)</p>

        <div />
      </div>
    );
  }
}
