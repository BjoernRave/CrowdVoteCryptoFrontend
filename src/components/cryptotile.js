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
  if (window.innerWidth < 1000) {
    console.log("window size smaller than 1000px");
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1000) {
      console.log("window size smaller than 1000px");
    }
  });
  return (
    <div id="tile">
      <Collapsible
        lazyRender
        trigger={
          <div id="uppertile">
            <img src={icon} alt="" id="cryptoIcon" />
            <p>{rank}.</p>
            <div>
              <Link
                style={tagsArray.length > 0 ? { marginBottom: "20px" } : null}
                to={"/" + name.toLowerCase().replace(/\s/g, "-")}
              >
                {name}({symbol.toUpperCase()})
              </Link>
              <div className="bestTags">{tagsArray.slice(0, 3)}</div>
            </div>
            <p title="The total available Supply multiplied by the Price">
              {Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(
                marketCap
              )}
            </p>
            <p>
              {new Intl.NumberFormat("de-DE", {
                currency: fiat,
                maximumSignificantDigits: 5,
                maximumFractionDigits: 4
              }).format(price)}
            </p>
            <p className="circulatingSply">
              {Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(
                circulatingSupply
              )}
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
          </div>
        }
      >
        <Expandable handleVote={handleVote} symbol={symbol} />
      </Collapsible>
    </div>
  );
};
