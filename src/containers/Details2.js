import React, { Component } from "react";
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
import Graph2 from "../components/graph2";
import { fetchHistCryptoData } from "../store/actions/cryptostats";
import DetailStats from "../components/DetailsStats";

class Expandable extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleChangeVote = this.handleChangeVote.bind(this);
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
    this.handleDeveloperExpand = this.handleDeveloperExpand.bind(this);
    this.handleRedditExpand = this.handleRedditExpand.bind(this);

    this.state = {
      comment: "",
      vote: "",
      developerExpand: false,
      redditExpand: false
    };
  }

  componentWillMount() {
    this.props.fetchMessages(this.props.symbol);
    this.props.fetchHistCryptoData(
      this.props.name.toLowerCase().replace(/\s/g, "-"),
      7
    );
  }

  componentDidUpdate() {
    // document.querySelector("#comments").scrollTop = 10000;
  }

  handleChangeComment(e) {
    this.setState({ comment: e.target.value });
  }
  handleDeveloperExpand() {
    this.setState({ developerExpand: !this.state.developerExpand });
  }
  handleRedditExpand() {
    this.setState({ redditExpand: !this.state.redditExpand });
  }

  handleSubmitComment(e) {
    e.preventDefault();
    if (this.props.currentUser.isAuthenticated) {
      this.props.postNewMessage(this.state.comment, this.props.symbol);
      this.props.messages[this.props.symbol].push({
        text: this.state.comment,
        createdAt: Date.now(),
        user: this.props.currentUser.user.username
      });
      this.setState({ comment: "" });
      document.querySelector("#DetailsComments").scrollTop = 10000;
    } else {
      document.querySelector("#flash").classList.add("flashactive");
      setTimeout(() => {
        document.querySelector("#flash").classList.remove("flashactive");
      }, 3000);
    }
  }

  handleChangeVote(e) {
    this.setState({ vote: e.target.value });
  }
  handleSubmitVote(e) {
    e.preventDefault();
    if (this.props.currentUser.isAuthenticated) {
      this.props.handleVote(Number(this.state.vote), this.props.symbol);
      this.setState({ vote: "" });
    } else {
      document.querySelector("#flash").classList.add("flashactive");
      setTimeout(() => {
        document.querySelector("#flash").classList.remove("flashactive");
      }, 3000);
    }
  }
  componentDidMount() {}

  render() {
    let messages = {};
    const specificData = this.props.cryptodata.filter(
      val => val.symbol === this.props.symbol
    );
    if (this.props.messages[this.props.symbol] !== undefined) {
      messages = this.props.messages[this.props.symbol].map(val => {
        return <li key={val._id}>{val.text}</li>;
      });
    }

    let messsageArray = [];
    if (typeof this.props.messages[this.props.symbol] !== "undefined") {
      messsageArray = this.props.messages[this.props.symbol].map(val => {
        return (
          <li key={val._id}>
            {val.user}-
            <Moment format="HH:mm : ">{val.createdAt}</Moment> {val.text}
            <button onClick={() => this.props.removeMessage(val._id)}>
              X{" "}
            </button>
          </li>
        );
      });
    }

    const data = specificData[0];
    const marketdata = data.market_data;
    return (
      <div>
        <div className="Details">
          <div>
            <img className="cryptoIcondetail" src={data.image.small} alt="" />
            <p className="detailsname">{data.name}</p>
          </div>

          <DetailStats
            data={specificData[0]}
            handleDeveloperExpand={this.handleDeveloperExpand}
            handleRedditExpand={this.handleRedditExpand}
            redditExpand={this.state.redditExpand}
            developerExpand={this.state.developerExpand}
          />
          <Graph2
            data={this.props.data}
            fetchstats={this.props.fetchHistCryptoData}
            name={this.props.name}
          />
          <Tags
            getTags={this.props.getTags}
            RemoveTag={this.props.DeleteTag}
            CreateTag={this.props.CreateNewTag}
            VoteTag={this.props.VoteTag}
            tags={this.props.tags}
            symbol={this.props.symbol}
          />
          <div className="DetailsCommentSection">
            <ul id="DetailsComments">
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
                id="Detailscomment"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(reduxState) {
  return {
    messages: reduxState.messages,
    currentUser: reduxState.currentUser,
    tags: reduxState.Tags,
    cryptodata: reduxState.cryptodata,
    data: reduxState.histData
  };
}

export default connect(mapStatetoProps, {
  fetchMessages,
  postNewMessage,
  removeMessage,
  getTags,
  DeleteTag,
  CreateNewTag,
  VoteTag,
  fetchHistCryptoData
})(Expandable);
