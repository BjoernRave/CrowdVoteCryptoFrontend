import React, { PureComponent } from "react";

export default class RatingComponent extends PureComponent {
  render() {
    return (
      <div id="rating">
        <button
          onClick={e => {
            this.props.handleVote(3, this.props.symbol);
            e.stopPropagation();
          }}
        >
          <i className="fas fa-arrow-up" />
        </button>
        <button
          onClick={e => {
            this.props.handleVote(-3, this.props.symbol);
            e.stopPropagation();
          }}
        >
          <i className="fas fa-arrow-down" />
        </button>
      </div>
    );
  }
}
