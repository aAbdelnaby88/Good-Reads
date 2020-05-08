import dotProp from "dot-prop-immutable";

import {
  UPDATE_ADMIN_PROPS,
  DELETE_ADMIN_PROPS,
  MERGE_ADMIN_PROPS,
} from "../actions/types";

const INITIAL_STATE = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11aGFtbWFkYWxzYWllZDk2QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU4ODYzNzM1MSwiZXhwIjoxNTg4NzIzNzUxfQ.EFWYfhBG3e3jjJEKZEKkQt4yGqAAW3AEYKXpjgdzCzo",
  email: "",
  password: "",
  emailState: "",

  activeTab: "1",
  isCategoryModal: false,
  categories: [
    { _id: 1, name: "Technology" },
    { _id: 2, name: "Sports" },
    { _id: 3, name: "Culture" },
  ],
  currentCategory: {
    name: "",
  },

  isBookModal: false,
  books: [],
  currentBook: {
    name: "",
  },

  isAuthorModal: false,
  authors: [
    {
      _id: 1,
      firstName: "Muhammad",
      lastName: "Alsaied",
      dob: new Date(),
      image: "",
    },
    {
      _id: 2,
      firstName: "Mahmoud",
      lastName: "Alsaied",
      dob: new Date(),
      image: null,
    },
  ],
  currentAuthor: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_PROPS: {
      let newState = state;
      for (let i = 0; i < action.payload.length; i++) {
        newState = dotProp.set(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
      }
      return newState;
    }
    case MERGE_ADMIN_PROPS: {
      let newState = state;
      for (let i = 0; i < action.payload.length; i++) {
        newState = dotProp.merge(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
      }
      return newState;
    }
    case DELETE_ADMIN_PROPS: {
      let newState = state;
      for (let i = 0; i < action.payload.length; i++) {
        newState = dotProp.delete(newState, action.payload[i].prop);
      }
      return newState;
    }
    default:
      return state;
  }
};
