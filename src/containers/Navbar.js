import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import Searchbar from "../components/searchBar";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: false,
      signin: false
    };
    this.toggleSignup = this.toggleSignup.bind(this);
    this.toggleSignin = this.toggleSignin.bind(this);
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

  render() {
    return (
      <div>
        <nav>
          <div>
            <Link to="/">CryptoSourced </Link>
          </div>
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

export default connect(mapStateToProps, { logout, authUser, removeError })(
  Navbar
);
