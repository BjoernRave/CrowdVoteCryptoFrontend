import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CryptotileBox from "./cryptotilesbox";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import DetailsPage from "../containers/Details2";
import { GetDetailRoutes } from "../store/actions/DetailRoutes";
import { fetchCryptoStats } from "../store/actions/cryptostats";
import { AnimatedRoute } from "react-router-transition";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DetailRoutes: []
    };
  }

  // componentDidUpdate() {
  //   console.log(this.props.cryptos.length + "update");
  //   console.log(this.state.DetailRoutes.length + "update");
  //   if (this.props.cryptos.length > 1 && this.state.DetailRoutes.length < 1) {
  //     let DetailRoutes = this.props.cryptos.map(val => {
  //       return (
  //         <Route
  //           key={val.id}
  //           path={"/" + val.name}
  //           crypto={val.symbol}
  //           render={props => <DetailsPage {...props} />}
  //         />
  //       );
  //     });
  //     this.setState({ DetailRoutes });
  //   }
  // }
  componentWillMount() {
    if (this.props.cryptos.length < 1) {
      this.props.fetchCryptoStats().then(res => {
        let DetailRoutes = this.props.cryptos.map(val => {
          return (
            <div key={val.id}>
              <Route path={"/" + val.name.toLowerCase().replace(/\s/g, "-")} />
              <AnimatedRoute
                path={"/" + val.name.toLowerCase().replace(/\s/g, "-")}
                component={props => (
                  <DetailsPage symbol={val.symbol} name={val.name} />
                )}
                atEnter={{ offset: -100 }}
                atLeave={{ offset: -100 }}
                atActive={{ offset: 0 }}
                mapStyles={styles => ({
                  transform: `translateX(${styles.offset}%)`
                })}
              />
            </div>
          );
        });
        this.setState({ DetailRoutes });
      });
    }
  }

  render() {
    const { authUser, errors, removeError } = this.props;

    return (
      <div className="container">
        <Switch>
          <Route exact path="/" render={props => <CryptotileBox />} />
          <Route
            exact
            path="/signin"
            render={props => {
              return (
                <AuthForm
                  removeError={removeError}
                  errors={errors}
                  onAuth={authUser}
                  buttonText="Log in"
                  heading="Welcome Back."
                  {...props}
                />
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={props => {
              return (
                <AuthForm
                  removeError={removeError}
                  errors={errors}
                  onAuth={authUser}
                  signUp
                  buttonText="Sign me up!"
                  heading="Join Warbler today."
                  {...props}
                />
              );
            }}
          />
          {this.state.DetailRoutes}
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    cryptos: state.cryptodata
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      authUser,
      removeError,
      GetDetailRoutes,
      fetchCryptoStats
    }
  )(Main)
);
