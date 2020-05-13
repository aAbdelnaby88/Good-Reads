import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import JWT from "jwt-decode";
import axios from "axios";
import { Container } from "reactstrap";

import Navbar from "./navbar";
import Dashboard from "./dashboard";
import Categories from "./categories";
import Category from "./categories/category";

import { getUserToken } from "../../utils";
import { updateLoginField } from "../../actions/loginActions";

import { getAllBooks } from "../../actions/booksActions";
import { getAllAuthors } from "../../actions/authorsActions";
import { getAllCategories } from "../../actions/categoriesActions";

class UserHome extends Component {
  componentDidMount() {
    const token = getUserToken();
    this.props.updateLoginField("token", token);
    this.props.updateLoginField("user", JWT(token));
  }

  componentDidUpdate() {
    if (!this.props.token) this.props.history.push("/");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.props.token;
    this.props.getAllBooks();
    this.props.getAllAuthors();
    this.props.getAllCategories();
  }
  render() {
    return (
      <Container>
        <Switch>
          <Navbar />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/categories/:id" exact component={Category} />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { token } = state.login;
  return { token };
};
export default connect(mapStateToProps, {
  updateLoginField,
  getAllCategories,
  getAllBooks,
  getAllAuthors,
})(UserHome);
