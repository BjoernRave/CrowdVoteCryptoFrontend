import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  fetchMessages,
  postNewMessage,
  removeMessage
} from "../store/actions/messages";
import Moment from "react-moment";
import {
  getTags,
  DeleteTag,
  CreateNewTag,
  VoteTag
} from "../store/actions/tags";
import Tags from "../components/tags";

class Expandable extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleChangeVote = this.handleChangeVote.bind(this);
    this.handleSubmitVote = this.handleSubmitVote.bind(this);

    this.state = {
      comment: "",
      vote: ""
    };
  }

  componentWillMount() {
    this.props.fetchMessages(this.props.symbol.toUpperCase());
  }

  componentDidUpdate() {
    document.querySelector("#comments").scrollTop = 10000;
  }

  handleChangeComment(e) {
    this.setState({ comment: e.target.value });
  }

  handleSubmitComment(e) {
    e.preventDefault();
    if (this.props.currentUser.isAuthenticated) {
      if (/\S/.test(this.state.comment)) {
        this.props.postNewMessage(this.state.comment, this.props.symbol);
        this.props.messages[this.props.symbol].push({
          text: this.state.comment,
          createdAt: Date.now(),
          user: this.props.currentUser.user.username
        });
        this.setState({ comment: "" });
        document.querySelector("#comments").scrollTop = 10000;
      }
    } else {
      document.querySelector("#flash").classList.add("flashactive");
      setTimeout(() => {
        document.querySelector("#flash").classList.remove("flashactive");
      }, 3000);
    }
  }

  handleChangeVote(e) {
    if (Number(e.target.value) < 61 || e.target.value === "-") {
      this.setState({ vote: e.target.value });
    }
  }
  handleSubmitVote(e) {
    e.preventDefault();
    if (this.props.currentUser.isAuthenticated) {
      if (this.state.vote !== "-") {
        this.props.handleVote(Number(this.state.vote), this.props.symbol);
        this.setState({ vote: "" });
      }
    } else {
      document.querySelector("#flash").classList.add("flashactive");
      setTimeout(() => {
        document.querySelector("#flash").classList.remove("flashactive");
      }, 3000);
    }
  }

  render() {
    console.log("rendering expandable");
    let messsageArray = [];
    if (typeof this.props.messages[this.props.symbol] !== "undefined") {
      messsageArray = this.props.messages[this.props.symbol].map(val => {
        return (
          <li
            className={
              this.props.currentUser.user.username === val.user
                ? "ownmessage"
                : null
            }
            key={val._id}
          >
            {this.props.currentUser.user.username === val.user && [
              <button
                key="6"
                onClick={() =>
                  this.props.removeMessage(val._id, this.props.symbol)
                }
              >
                <i className="fas fa-trash" />
              </button>
            ]}
            <span className="bubble"> {val.text} </span> <br />
            <span>
              {val.user}-
              <Moment format="HH:mm">{val.createdAt}</Moment>
            </span>
          </li>
        );
      });
      if (messsageArray.length > 20) {
        messsageArray = messsageArray.splice(
          this.props.messages[this.props.symbol].length - 20,
          this.props.messages[this.props.symbol].length
        );
      }
    }

    return (
      <div className="Expandable">
        <div className="CommentSection">
          <ul id="comments">
            {/* <CSSTransitionGroup
              transitionName="chatslide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            > */}
            {messsageArray}
            {/* </CSSTransitionGroup> */}
          </ul>
          <form onSubmit={this.handleSubmitComment}>
            <input
              onChange={this.handleChangeComment}
              type="text"
              value={this.state.comment}
              name="Comment"
              placeholder="Share your thoughts on this Coin"
              id="comment"
            />
          </form>
        </div>
        <Tags
          getTags={this.props.getTags}
          RemoveTag={this.props.DeleteTag}
          CreateTag={this.props.CreateNewTag}
          VoteTag={this.props.VoteTag}
          tags={this.props.tags}
          symbol={this.props.symbol}
          currentUser={this.props.currentUser}
        />
        <div className="advancedVote">
          <form onSubmit={this.handleSubmitVote}>
            <input
              type="range"
              min="-60"
              max="60"
              onChange={this.handleChangeVote}
              value={this.state.vote}
              name=""
              id=""
              step="0.2"
            />
            <div className="advancedVotediv">
              <div>
                <input
                  onChange={this.handleChangeVote}
                  type="text"
                  value={this.state.vote}
                  name=""
                  id="vote"
                  placeholder="0"
                />
                <span>%</span>
              </div>
              <button className="btn">Submit Rating</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(reduxState) {
  return {
    messages: reduxState.messages,
    currentUser: reduxState.currentUser,
    tags: reduxState.Tags
  };
}

export default connect(
  mapStatetoProps,
  {
    fetchMessages,
    postNewMessage,
    removeMessage,
    getTags,
    DeleteTag,
    CreateNewTag,
    VoteTag
  }
)(Expandable);
