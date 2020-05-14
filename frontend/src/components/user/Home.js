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

import Books from "./books/Books";
import Book from "./books/Book";

import { getUserToken } from "../../utils";
import { updateLoginField } from "../../actions/loginActions";

import { getAllBooks } from "../../actions/booksActions";
import { getAllAuthors } from "../../actions/authorsActions";
import { getAllCategories } from "../../actions/categoriesActions";

class UserHome extends Component {
  constructor() {
    super();
    this.token = getUserToken();
    axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
  }
  componentDidMount() {
    this.props.updateLoginField("token", this.token);
    this.props.updateLoginField("user", JWT(this.token));
    this.props.getAllBooks();
    this.props.getAllAuthors();
  }

  componentDidUpdate() {
    if (!this.props.token) this.props.history.push("/");
  }
  render() {
    const { books } = this.props;
    return (
      <Container>
        <Switch>
          <Navbar />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/categories/:id" exact component={Category} />

          <Route path="/books" exact>
            <Books books={books} />
          </Route>
          <Route path="/books/:id" exact component={Book} />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { token } = state.login;
  const { books } = state.books;
  return { token, books };
};
export default connect(mapStateToProps, {
  updateLoginField,
  getAllCategories,
  getAllBooks,
  getAllAuthors,
})(UserHome);
