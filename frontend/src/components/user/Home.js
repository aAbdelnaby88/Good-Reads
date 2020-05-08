import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import Navbar from "./navbar";
import Dashboard from "./dashboard";
import Categories from "./categories";

class UserHome extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Navbar />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/categories" exact component={Categories} />
        </Switch>
      </Container>
    );
  }
}

export default UserHome;
