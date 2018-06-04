import React, { Component } from "react";

export default class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = { input: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.currentUser.isAuthenticated) {
      this.props.CreateTag(this.state.input, this.props.symbol);
      this.setState({ input: "" });
    } else {
      document.querySelector("#flash").classList.add("flashactive");
      setTimeout(() => {
        document.querySelector("#flash").classList.remove("flashactive");
      }, 3000);
    }
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  componentWillMount() {
    this.props.getTags();
  }

  render() {
    let tagsArray = [];
    if (this.props.tags.length > 0) {
      tagsArray = this.props.tags
        .filter(val => val.symbol === this.props.symbol)
        .map(val => {
          return (
            <li className="tag" key={val._id}>
              <button
                onClick={() => this.props.VoteTag(val._id, val.votes + 1)}
              >
                <i className="fas fa-caret-up" />
                {val.votes}
              </button>
              {val.text}
              {val.user === this.props.currentUser.user.username && [
                <button key="5" onClick={() => this.props.RemoveTag(val._id)}>
                  X
                </button>
              ]}
            </li>
          );
        });
    }
    return (
      <div className="detailTags">
        {/* <p>Community Tags</p> */}
        <ul>{tagsArray}</ul>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.input}
            type="text"
            placeholder="Add Tag"
          />
        </form>
      </div>
    );
  }
}
