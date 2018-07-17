import React, { Component } from "react";
import { connect } from "react-redux";

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
  }

  showSearch() {
    this.setState({ Expanded: !this.state.Expanded });
  }

  async handleInput(e) {
    await this.setState({ searchquery: e.target.value });
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
          "#" + this.state.searchquery.toLowerCase().replace(/ /g, "")
        ) !== null
      ) {
        const top = document.querySelector(
          "#" + this.state.searchquery.toLowerCase().replace(/ /g, "")
        ).offsetTop;
        window.scrollTo(0, top - 75);
        this.setState({ searchquery: "" });
      }
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
          <form onSubmit={this.handleSearch}>
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
