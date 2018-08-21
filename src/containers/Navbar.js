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
import Logo from "../images/CWClogo.png";
import Popup from "../components/popup";
import { CSSTransitionGroup } from "react-transition-group";
import CookieBanner from "../components/CookieBanner";
const cookies = new Cookies();

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: false,
      signin: false,
      fiat: cookies.get("fiat"),
      CookiePopup: true,
      popup: false
    };
    this.toggleSignup = this.toggleSignup.bind(this);
    this.toggleSignin = this.toggleSignin.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleAgree = this.handleAgree.bind(this);
    this.closepopup = this.closepopup.bind(this);
  }
  componentWillMount() {
    if (cookies.get("Policy")) {
      this.setState({ CookiePopup: false });
    }
  }

  logout = e => {
    e.preventDefault();
    this.props.logout();
  };

  closepopup() {
    this.setState({ closepopup: true });
  }

  toggleSignup() {
    this.setState({
      signup: !this.state.signup,
      signin: false
    });
  }
  handleAgree() {
    cookies.set("Policy", true, {
      path: "/",
      expires: new Date(2048, 11, 24)
    });
    this.setState({ CookiePopup: false });
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
        {!this.state.closepopup && <Popup closepopup={this.closepopup} />}
        <nav>
          <div>
            <Link to="/">
              {/* Crowd. <br />{" "}
              <span>
                {" "}
                Vote. <br /> Crypto.{" "}
              </span>{" "} */}
              <img src={Logo} alt="" className="logo" />
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
        <CSSTransitionGroup
          transitionName={"swipe-left"}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.state.signup &&
            !this.state.signin && (
              <AuthForm
                removeError={this.props.removeError}
                errors={this.props.errors}
                onAuth={this.props.authUser}
                buttonText="Sign me up!"
                heading="Register Now!"
                signUp
                onSignUp={this.toggleSignup}
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
                onSignIn={this.toggleSignin}
              />
            )}
        </CSSTransitionGroup>
        {this.state.CookiePopup && (
          <CookieBanner handleAgree={this.handleAgree} />
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
