import {
  UPDATE_ADMIN_PROPS,
  DELETE_ADMIN_PROPS,
  MERGE_ADMIN_PROPS,
} from "./types";
import axios from "axios";

import { API_HOST, handleError, showMessage } from "../utils";

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

const constructFormDataFromBookObject = (user) => {
  const formData = new FormData();

  const { name, author, category, image } = user;
  formData.append("name", name);
  formData.append("author", author._id);
  formData.append("category", category._id);
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

export const getAllAuthors = () => (dispatch) => {
  axios
    .get(`${API_HOST}/authors`)
    .then((data) => {
      const authors = data.data.data;
      dispatch(updateAdminProps([{ prop: "authors", value: authors }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

const constructFormDataFromAuthorObject = (user) => {
  const formData = new FormData();

  const { firstName, lastName, image, dob } = user;
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("dob", dob);
  formData.append("image", image);
  return formData;
};

export const addNewAuthor = (author) => (dispatch) => {
  const formData = constructFormDataFromAuthorObject(author);
  axios
    .post(`${API_HOST}/authors`, formData)
    .then((data) => {
      const author = data.data.data;
      dispatch(mergeAdminProps([{ prop: "authors", value: author }]));
      dispatch(updateAdminProps([{ prop: "isAuthorModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateAuthor = (author, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/authors/${author._id}`, author)
    .then((data) => {
      const author = data.data.data;
      dispatch(updateAdminProps([{ prop: "authors." + index, value: author }]));
      dispatch(updateAdminProps([{ prop: "isAuthorModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const deleteAuthor = (_id, index) => (dispatch) => {
  axios
    .delete(`${API_HOST}/authors/${_id}`)
    .then((data) => {
      dispatch(deleteAdminProps([{ prop: "authors." + index }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const getAllCategories = () => (dispatch) => {
  axios
    .get(`${API_HOST}/categories`)
    .then((data) => {
      const categories = data.data.data;
      dispatch(updateAdminProps([{ prop: "categories", value: categories }]));
    })
    .catch((err) => {
      handleError(err);
    });
};

export const addNewCategory = (category) => (dispatch) => {
  console.log("category", category);
  axios
    .post(`${API_HOST}/categories`, category)
    .then((data) => {
      const category = data.data.data;
      dispatch(mergeAdminProps([{ prop: "categories", value: category }]));
      dispatch(updateAdminProps([{ prop: "isCategoryModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateCategory = (category, index) => (dispatch) => {
  axios
    .patch(`${API_HOST}/categories/${category._id}`, category)
    .then((data) => {
      const category = data.data.data;
      dispatch(
        updateAdminProps([{ prop: "categories." + index, value: category }])
      );
      dispatch(updateAdminProps([{ prop: "isCategoryModal", value: false }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};

export const deleteCategory = (_id, index) => (dispatch) => {
  axios
    .delete(`${API_HOST}/categories/${_id}`)
    .then((data) => {
      dispatch(deleteAdminProps([{ prop: "categories." + index }]));
      showMessage("Success!", data.data.message, "success");
    })
    .catch((err) => {
      handleError(err);
    });
};
