import React, { Component } from "react";

export default class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = { input: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    if (this.props.currentUser.isAuthenticated) {
      this.props.CreateTag(this.state.input, this.props.symbol);
      this.setState({ input: "" });
    } else {
      let flash = document.querySelector("#flash");
      flash.textContent = "You need to be logged in to do that!";
      flash.classList.add("flashactive");
      setTimeout(() => {
        flash.classList.remove("flashactive");
      }, 3000);
    }
  }
  handleChange(e) {
    if (e.target.value.length < 65) {
      this.setState({ input: e.target.value });
    }
  }
  handleVote(val) {
    setTimeout(() => {
      this.props.getTags();
    }, 800);
    this.props.VoteTag(val._id);
  }

  render() {
    let tagsArray = [];
    if (this.props.tags.length > 0) {
      tagsArray = this.props.tags
        .filter(val => val.symbol === this.props.symbol)
        .sort((a, b) => b.votes.length - 1 - a.votes.length - 1)
        .map(val => {
          return (
            <li className="tag" key={val._id}>
              <button onClick={() => this.handleVote(val)}>
                <i className="fas fa-caret-up" />
                {val.votes.length - 1}
              </button>
              <span> {val.text} </span>
              {val.user === this.props.currentUser.user.username && [
                <button key="5" onClick={() => this.props.RemoveTag(val._id)}>
                  <i className="fas fa-trash" />
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
            className="fullInput"
            onChange={this.handleChange}
            value={this.state.input}
            type="text"
            placeholder="Add your own Tag"
          />
        </form>
      </div>
    );
  }
}
