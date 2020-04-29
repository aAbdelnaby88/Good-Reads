import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";

import RootReducer from "./reducers";
import "./App.css";

import Home from "./components/home/Home";

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(Thunk),
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/books">
            <h3>Books</h3>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
