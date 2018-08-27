import React from "react";
import Rating from "./rating";
import Expandable from "./Expandable";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";

export default ({
  name,
  price,
  symbol,
  marketCap,
  change24h,
  circulatingSupply,
  rank,
  id,
  tags,
  icon,
  voteResult,
  handleVote,
  voteCount,
  votes,
  fiat
}) => {
  let tagsArray = tags
    .filter(val => val.symbol === symbol)
    .sort((a, b) => b.votes.length - a.votes.length)
    .map((val, ind) => {
      return <p key={ind}>{val.text}</p>;
    });
  console.log(fiat);

  return (
    <div id="tile">
      <Collapsible
        lazyRender
        trigger={
          <div id="uppertile">
            <img src={icon} alt="" id="cryptoIcon" />
            <p>{rank}.</p>
            <Link
              style={tagsArray.length > 0 ? { marginBottom: "20px" } : null}
              to={"/" + name.toLowerCase().replace(/\s/g, "-")}
            >
              {name}({symbol.toUpperCase()})
            </Link>

            <p title="The total available Supply multiplied by the Price">
              {Intl.NumberFormat().format(Number(marketCap).toFixed(0))}
            </p>
            <p>
              {new Intl.NumberFormat("de-DE", {
                currency: fiat,
                maximumSignificantDigits: 7
              }).format(price)}
            </p>
            <p>
              {Intl.NumberFormat().format(Number(circulatingSupply).toFixed(0))}
            </p>
            {Number(change24h) < 0 ? (
              <p className="red">{Number(change24h).toFixed(2)} %</p>
            ) : (
              <p className="green">{Number(change24h).toFixed(2)} %</p>
            )}

            {Number(voteResult) < 0 ? (
              <p className="red">{voteResult}%</p>
            ) : (
              <p className="green">{voteResult}%</p>
            )}

            <p>{voteCount}</p>

            <Rating handleVote={handleVote} symbol={symbol} votes={votes} />
            <Link
              className="smallGraph"
              to={"/" + name.toLowerCase().replace(/\s/g, "-")}
            >
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
            <div className="bestTags">{tagsArray.slice(0, 3)}</div>
          </div>
        }
      >
        <Expandable
          parent={this.Cryptotile}
          handlevote={handleVote}
          symbol={symbol}
        />
      </Collapsible>
    </div>
  );
};
