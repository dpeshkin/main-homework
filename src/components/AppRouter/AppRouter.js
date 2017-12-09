import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import LoginPage from "../LoginPage";

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <LoginPage />
      </Switch>
    );
  }
}

export default AppRouter;
