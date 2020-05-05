import {
  UPDATE_ADMIN_PROPS,
  DELETE_ADMIN_PROPS,
  MERGE_ADMIN_PROPS,
} from "./types";
import axios from "axios";

import { API_HOST, handleError, showMessage, setAdminToken } from "../utils";

export const updateAdminProps = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_ADMIN_PROPS,
    payload,
  });
};

export const deleteAdminProps = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_ADMIN_PROPS,
    payload,
  });
};

export const mergeAdminProps = (payload) => (dispatch) => {
  dispatch({
    type: MERGE_ADMIN_PROPS,
    payload,
  });
};

export const loginAdmin = (email, password) => (dispatch) => {
  console.log(email, password);
  axios
    .post(`${API_HOST}/admin/login`, { username: email, password })
    .then((data) => {
      const { token } = data.data;
      dispatch(updateAdminProps([{ prop: "token", value: token }]));
      showMessage(
        "Login Success!",
        "Welecome, redirecting to admin panel...",
        "success"
      );
    })
    .catch((err) => {
      handleError(err);
    });
};

export const getAllBooks = () => (dispatch) => {
  axios
    .get(`${API_HOST}/books`)
    .then((data) => {
      const books = data.data.data;
      console.log(books);
      dispatch(updateAdminProps([{ prop: "books", value: books }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

const constructFormDataFromBookObject = (book) => {
  const formData = new FormData();

  const { name, author, category, image } = book;
  formData.append("name", name);
  /*   formData.append("author", author._id);
  formData.append("category", category._id); */
  formData.append("image", image);
  return formData;
};

export const addNewBook = (book) => (dispatch) => {
  const formData = constructFormDataFromBookObject(book);
  axios
    .post(`${API_HOST}/books`, formData)
    .then((data) => {
      const book = data.data.data;
      dispatch(mergeAdminProps([{ prop: "books", value: book }]));
      dispatch(updateAdminProps([{ prop: "isBookModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateBook = (book, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/books/${book._id}`, book)
    .then((data) => {
      const book = data.data.data;
      dispatch(updateAdminProps([{ prop: "books." + index, value: book }]));
      dispatch(updateAdminProps([{ prop: "isBookModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const deleteBook = (_id, index) => (dispatch) => {
  axios
    .delete(`${API_HOST}/books/${_id}`)
    .then((data) => {
      dispatch(deleteAdminProps([{ prop: "books." + index }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};
