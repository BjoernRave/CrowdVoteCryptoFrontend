import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.onSignUp();
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      });
  };

  handleChange = e => {
    if (e.target.value !== "") {
      document
        .querySelector(`#${e.target.name} +label`)
        .classList.add("filled");
    } else {
      document
        .querySelector(`#${e.target.name} +label`)
        .classList.remove("filled");
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, username, password } = this.state;
    const {
      signUp,
      heading,
      buttonText,
      errors,
      history,
      removeError
    } = this.props;

    // history.listen(() => {
    //   removeError();
    // });

    return (
      // <div className={this.props.signUp ? "signupform" : "signinform"}>
      <div className="signinform">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2>{heading}</h2>
          {errors.message && <div>{errors.message}</div>}
          <div className="field">
            <input
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              title="Please provide a valid E-mail address"
              required
              autoComplete="off"
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleChange}
              type="text"
              value={email}
            />
            <label>E-mail</label>
          </div>
          <div className="field">
            <input
              required
              pattern=".{8,}"
              title="Your password need 8 or more characters"
              autoComplete="off"
              id="password"
              name="password"
              onChange={this.handleChange}
              type="password"
              value={password}
            />
            <label>Password</label>
          </div>
          {signUp && [
            <div key="1" className="field">
              <input
                pattern=".{6,}"
                title="Your Username needs 6 or more characters"
                required
                autoComplete="off"
                id="username"
                name="username"
                onChange={this.handleChange}
                type="text"
                value={username}
              />
              <label>Username</label>
            </div>
          ]}
          <button className="btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
