import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import LoginPage from "../LoginPage";
import MainPage from "../MainPage";
import PrivateRoute from "../PrivateRoute";
import { connect } from "react-redux";
import { getIsAuthorized } from "../../reducers/auth";

export class AppRouter extends Component {
  render() {
    const { isAuthorized } = this.props;
    return (
      <Switch>
        <PrivateRoute path="/profile" component={MainPage} />
        {!isAuthorized && <Route path="/login" component={LoginPage} />}
        <Redirect to="/profile" />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

export default withRouter(connect(mapStateToProps)(AppRouter));
