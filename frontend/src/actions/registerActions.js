import { UPDATE_REGISTER_FIELD, UPDATE_GENERAL_PROPS } from "./types";
import axios from "axios";
import { API_HOST, handleError, showMessage, setUserToken } from "../utils";

export const updateRegisterField = (key, value) => (dispatch) => {
  dispatch({ type: UPDATE_REGISTER_FIELD, payload: { key, value } });
};
export const updateGeneralProps = (payload) => (dispatch) => {
  dispatch({ type: UPDATE_GENERAL_PROPS, payload });
};

const constructFormDataFromUserObject = (book) => {
  const formData = new FormData();

  const { firstName, lastName, email, password, image } = book;
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("image", image);

  return formData;
};

export const signupUser = (user) => (dispatch) => {
  const formData = constructFormDataFromUserObject(user);
  console.log("formData", formData);
  axios
    .post(`${API_HOST}/signup`, formData)
    .then((res) => {
      const { token, message } = res.data;
      setUserToken(token);
      dispatch(updateGeneralProps([{ prop: token, value: token }]));
      showMessage("Success!", message, "success");
    })
    .catch((err) => handleError(err));
};
