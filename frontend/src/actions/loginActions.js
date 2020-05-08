import { UPDATE_LOGIN_FIELD, UPDATE_GENERAL_PROPS } from "./types";
import axios from "axios";
import { API_HOST, handleError, showMessage, setUserToken } from "../utils";

export const updateLoginField = (key, value) => (dispatch) => {
  dispatch({ type: UPDATE_LOGIN_FIELD, payload: { key, value } });
};

export const loginUser = (email, password) => (dispatch) => {
  axios
    .post(`${API_HOST}/login`, { email, password })
    .then((res) => {
      const { token, message } = res.data;
      setUserToken(token);
      dispatch({
        type: UPDATE_GENERAL_PROPS,
        payload: [{ prop: "token", value: token }],
      });
      showMessage("Success!", message, "success");
    })
    .catch((err) => handleError(err));
};
