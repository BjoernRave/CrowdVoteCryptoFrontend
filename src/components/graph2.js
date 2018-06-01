import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Crosshair
} from "react-vis";

export default class DynamicCrosshair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataY: "",
      dataX: "",
      crosshaiValues: []
    };

    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestX = this._onNearestX.bind(this);
  }

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  _onNearestX(value, { index }) {
    this.setState({
      crosshairValues: [this.props.data].map(d => d[index]),
      dataX: new Date(value.x).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      }),
      dataY: value.y.toFixed(4)
    });
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave() {
    this.setState({ crosshairValues: [] });
  }

  render() {
    let myValues = this.state.crosshairValues;
    return (
      <div className="detailGraph">
        <XYPlot onMouseLeave={this._onMouseLeave} width={800} height={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis
            title="Date"
            tickTotal={10}
            attr="x"
            attrAxis="y"
            orientation="bottom"
            tickFormat={function tickFormat(d) {
              return new Date(d).toLocaleDateString();
            }}
          />
          <YAxis title="Price" />
          <LineSeries onNearestX={this._onNearestX} data={this.props.data} />

          <Crosshair values={myValues}>
            <div className="crosshair">
              <p>
                <span> Date: </span>
                {this.state.dataX}
              </p>
              <p>
                {" "}
                <span> Price:</span> {this.state.dataY}$
              </p>
            </div>
          </Crosshair>
        </XYPlot>
        <button onClick={() => this.props.fetchstats(this.props.name, 7)}>
          7 days
        </button>
        <button onClick={() => this.props.fetchstats(this.props.name, 30)}>
          30 days
        </button>
        <button onClick={() => this.props.fetchstats(this.props.name, 180)}>
          180 days
        </button>
        <button onClick={() => this.props.fetchstats(this.props.name, "max")}>
          Since Release
        </button>
      </div>
    );
  }
}
