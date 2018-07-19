import React, { Component } from "react";
import { connect } from "react-redux";

let queryLength = 0;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchquery: "",
      suggestionItems: [],
      Expanded: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.checkForEnter = this.checkForEnter.bind(this);
  }
  componentDidMount() {}

  showSearch() {
    this.setState({ Expanded: !this.state.Expanded });
  }

  async handleInput(e) {
    const value = e.target.value.toLowerCase().replace(/ /g, "-");
    if (value.length - queryLength > 1) {
      const top = document.querySelector("#" + value).offsetTop;
      window.scrollTo(0, top - 15);
      this.setState({ searchquery: "" });
    } else {
      await this.setState({ searchquery: e.target.value });
    }
    queryLength = value.length;

    if (this.state.searchquery !== "") {
      let suggestions = this.props.crypto.filter(val => {
        return val.name
          .toLowerCase()
          .includes(this.state.searchquery.toLowerCase());
      });
      let suggestionItems = suggestions
        .map((val, ind) => {
          return (
            <option value={val.name} key={ind}>
              {val.name}
            </option>
          );
        })
        .slice(0, 5);
      this.setState({ suggestionItems });
    } else {
      this.setState({ suggestionItems: [] });
    }
  }
  handleSearch(e) {
    e.preventDefault();
    if (this.state.searchquery !== "") {
      if (
        document.querySelector(
          "#" + this.state.searchquery.toLowerCase().replace(/ /g, "-")
        ) !== null
      ) {
        const top = document.querySelector(
          "#" + this.state.searchquery.toLowerCase().replace(/ /g, "-")
        ).offsetTop;
        window.scrollTo(0, top - 75);
        this.setState({ searchquery: "" });
      }
    }
  }

  checkForEnter(e) {
    // console.log(e.charCode);
    if (e.charCode === 13) {
      console.log("Enter pressed");
    }
  }

  render() {
    return (
      <div id="searchBar">
        <div className="SearchIcon">
          {/* <button onClick={this.showSearch}>
            {!this.state.Expanded ? (
              <i className="fas fa-search" />
            ) : (
              <i className="fas fa-times" />
            )}
          </button> */}
        </div>

        <div>
          <form onKeyPress={this.checkForEnter} onSubmit={this.handleSearch}>
            <input
              type="text"
              name="search"
              value={this.state.searchquery}
              onChange={this.handleInput}
              placeholder="Search Coin..."
              id="search"
              list="searchsuggestions"
              autoComplete="off"
            />
            <datalist
              onSubmit={() => console.log("test")}
              id="searchsuggestions"
              className="suggestions"
            >
              {this.state.suggestionItems}
            </datalist>
            <button id="searchbtn">
              <i className="fas fa-search" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    crypto: state.cryptodata
  };
}

export default connect(
  mapStateToProps,
  null
)(SearchBar);
