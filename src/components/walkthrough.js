import React, { Component } from "react";
import PropTypes from "prop-types";
import Joyride from "react-joyride";

class Basic extends Component {
  state = {
    run: false
  };

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  handleClickStart = e => {
    e.preventDefault();

    this.setState({
      run: true
    });
  };

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { type } = data;

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

  render() {
    const { run } = this.state;

    return (
      <div className="demo-wrapper">
        <Joyride
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          run={run}
          steps={[
            {
              content: <h2>Let's start the tour!</h2>,
              placement: "center",
              disableBeacon: true,
              styles: {
                options: {
                  zIndex: 10000
                }
              },
              locale: { skip: "wow!" },
              target: "body"
            },
            {
              content: "These are our super awesome projects!",
              placement: "bottom",
              styles: {
                options: {
                  width: 900
                }
              },
              target: ".demo__projects h1",
              title: "Our projects"
            },
            {
              title: "Our Mission",
              content: (
                <div>
                  You can render anything here.<br />
                  <h3>Like a H3 title</h3>
                </div>
              ),
              target: ".demo__how-it-works h1",
              placement: "top"
            },
            {
              content: (
                <div>
                  <h3>Or event a SVG icon</h3>
                  <svg
                    width="96px"
                    height="96px"
                    viewBox="0 0 96 96"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                        fill="#000000"
                      />
                    </g>
                  </svg>
                </div>
              ),
              placement: "left",
              target: ".demo__about h1"
            }
          ]}
          callback={this.handleJoyrideCallback}
        />

        <div className="demo__section demo__hero">
          <div>
            <h1>Create walkthroughs and guided tours for your ReactJS apps.</h1>
            <button onClick={this.handleClickStart}>Let's Go!</button>
          </div>
        </div>
        <div className="demo__section demo__projects">
          <h1>OUR PROJECTS</h1>
        </div>
        <div className="demo__section demo__how-it-works">
          <h1>HOW DOES IT WORK</h1>
        </div>
        <div className="demo__section demo__about">
          <h1>ALL ABOUT IT</h1>
        </div>
      </div>
    );
  }
}

export default Basic;
