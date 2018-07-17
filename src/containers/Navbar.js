import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import Searchbar from "../components/searchBar";
import { SetFiatCurrency } from "../store/actions/FiatCurrency";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: false,
      signin: false,
      fiat: cookies.get("fiat")
    };
    this.toggleSignup = this.toggleSignup.bind(this);
    this.toggleSignin = this.toggleSignin.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  logout = e => {
    e.preventDefault();
    this.props.logout();
  };

  toggleSignup() {
    this.setState({
      signup: !this.state.signup,
      signin: false
    });
  }

  toggleSignin() {
    this.setState({ signin: !this.state.signin, signup: false });
  }
  async componentWillUpdate() {
    if (
      this.props.currentUser.isAuthenticated &&
      (this.state.signin || this.state.signup)
    ) {
      await this.setState({ signin: false, signUp: false });
    }
  }

  handleSelectChange(e) {
    this.props.SetFiatCurrency(e.target.value);
    this.setState({ fiat: e.target.value });

    cookies.set("fiat", e.target.value, {
      path: "/",
      expires: new Date(2048, 11, 24)
    });
    console.log(cookies.get("fiat")); // Pacman
  }

  render() {
    return (
      <div>
        <nav>
          <div>
            <Link to="/">
              Crowd. <br />{" "}
              <span>
                {" "}
                Vote. <br /> Crypto.{" "}
              </span>{" "}
            </Link>
          </div>
          <div className="rightNav">
            <select
              className="select"
              onChange={this.handleSelectChange}
              name="FiatCurrency"
              value={this.state.fiat}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BTC">BTC</option>
              <option value="RUB">RUB</option>
              <option value="GBP">GBP</option>
              <option value="CNY">CNY</option>
            </select>
            <Searchbar />
            {this.props.currentUser.isAuthenticated ? (
              <button className="" onClick={this.logout}>
                Log out
              </button>
            ) : (
              <div>
                <button className="" onClick={this.toggleSignup}>
                  Sign up
                </button>
                <button key="3" className="" onClick={this.toggleSignin}>
                  Log in
                </button>
              </div>
            )}
          </div>
        </nav>
        {this.state.signup &&
          !this.state.signin && (
            <AuthForm
              removeError={this.props.removeError}
              errors={this.props.errors}
              onAuth={this.props.authUser}
              buttonText="Sign me up!"
              heading="Register Now!"
              signUp
            />
          )}
        {this.state.signin &&
          !this.state.signup && (
            <AuthForm
              removeError={this.props.removeError}
              errors={this.props.errors}
              onAuth={this.props.authUser}
              buttonText="Log in!"
              heading="Welcome Back."
            />
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { logout, authUser, removeError, SetFiatCurrency }
)(Navbar);
