import React from "react";

export default ({ handleSorting, handleHover, order, fiat }) => {
  return (
    <div id="namingbar">
      <div />
      <p className="descRank" onClick={() => handleSorting("rank")}>
        #
        <span>
          <i className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"} />
        </span>
      </p>
      <p className="descName">Name</p>
      <p
        // onMouseOver={handleHover}
        onClick={handleSorting.bind(this, "marketCap")}
      >
        Market Cap in {fiat.fiat}
        <span>
          <i className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"} />
        </span>
      </p>

      <p onClick={handleSorting.bind(this, "price")}>
        Price in {fiat.fiat}
        <span>
          <i className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"} />
        </span>
      </p>
      <p onClick={handleSorting.bind(this, "circulatingSupply")}>
        Circulating Supply
        <span>
          <i className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"} />
        </span>
      </p>
      <p className="descChg" onClick={handleSorting.bind(this, "change24h")}>
        Change(24h)
        <span>
          <i className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"} />
        </span>
      </p>
      <p
        className="descEstChg"
        onClick={handleSorting.bind(this, "voteResult")}
      >
        Estimated Change(24h)
        <span>
          <i className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"} />
        </span>
      </p>
      <p
        className="descNumVotes"
        onClick={handleSorting.bind(this, "voteCount")}
      >
        Number of Votes
        <span>
          <i className={!order ? "fas fa-sort-up rotated" : "fas fa-sort-up"} />
        </span>
      </p>

      <div />
      <p className="descGraph">Price Graph(7d)</p>

      <div />
    </div>
  );
};
