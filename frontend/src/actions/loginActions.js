import { UPDATE_LOGIN_FIELD, UPDATE_USER_INFO } from "./types";
import axios from "axios";

export const updateLoginField = (key, value) => (dispatch) => {
  dispatch({ type: UPDATE_LOGIN_FIELD, payload: { key, value } });
};

export const login = (email, password) => (dispatch) => {
  /*   dispatch({ type: UPDATE_LOGIN_FIELD, payload: { key, value } });
   */
  axios
    .post("localhost:5000/login", { email, password })
    .then((data) => {
      dispatch({ type: UPDATE_USER_INFO, payload: { user: data.user } });
    })
    .catch((err) => {});
};
