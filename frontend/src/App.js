import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import RootReducer from "./reducers";
import "./App.css";

import Home from "./components/home";
import AdminHome from "./components/admin/Home";
import AdminLogin from "./components/admin/login";

import UserHome from "./components/user/Home";

import AdminRoute from "./components/admin/AdminRoute";
import AdminLoggedInRoute from "./components/admin/AdminLoggedInRoute";

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
  const AdminToken = store.getState().admin.token;
  return (
    <Provider store={store}>
      <ReactNotification />
      <Router>
        <Switch>
          <AdminLoggedInRoute component={AdminLogin} path="/login" exact />
          <AdminRoute component={AdminHome} path="/admin" exact />
         
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/" component={UserHome} />
          
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
