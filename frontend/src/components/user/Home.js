import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import JWT from "jwt-decode";

import { Container } from "reactstrap";

import Navbar from "./navbar";
import Dashboard from "./dashboard";
import Categories from "./categories";

import { getUserToken } from "../../utils";
import { updateLoginField } from "../../actions/loginActions";

class UserHome extends Component {
  componentDidMount() {
    const token = getUserToken();
    this.props.updateLoginField("token", token);
    this.props.updateLoginField("user", JWT(token));
  }

  componentDidUpdate() {
    if (!this.props.token) this.props.history.push("/");
  }
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

const mapStateToProps = (state) => {
  const { token } = state.login;
  return { token };
};
export default connect(mapStateToProps, { updateLoginField })(UserHome);
