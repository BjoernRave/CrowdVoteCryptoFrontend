import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CryptotileBox from "./cryptotilesbox";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import DetailsPage from "../containers/Details2";
import NotFound from "../components/404NotFound";
import { GetDetailRoutes } from "../store/actions/DetailRoutes";
import { fetchCryptoStats } from "../store/actions/cryptostats";
import {
  TransitionGroup,
  CSSTransition,
  CSSTransitionGroup
} from "react-transition-group";
import Switch from "react-router-transition-switch";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DetailRoutes: []
    };
  }
  componentWillMount() {
    if (this.props.cryptos.length < 1) {
      this.props.fetchCryptoStats().then(res => {
        let DetailRoutes = this.props.cryptos.map(val => {
          return (
            <Route
              key={val.id}
              path={"/" + val.name.toLowerCase().replace(/\s/g, "-")}
              render={props => (
                <DetailsPage symbol={val.symbol} name={val.name} />
              )}
            />
          );
        });
        this.setState({ DetailRoutes });
      });
    }
  }

  render() {
    const { authUser, errors, removeError, location } = this.props;

    return (
      <div className="container">
        <TransitionGroup>
          <Switch key={location.key} location={location}>
            <Route exact path="/" component={CryptotileBox} />
            {this.state.DetailRoutes}
            <Route component={NotFound} />
          </Switch>
        </TransitionGroup>
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
