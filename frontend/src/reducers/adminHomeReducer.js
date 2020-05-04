import dotProp from "dot-prop-immutable";

import {
  UPDATE_ADMIN_PROPS,
  DELETE_ADMIN_PROPS,
  MERGE_ADMIN_PROPS,
} from "../actions/types";

const INITIAL_STATE = {
  token: null,

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
  books: [
    {
      _id: 1,
      name: "How to be professional?",
      author: { _id: 2, firstname: "Mahmoud", lastname: "Alsaied" },
      category: { _id: 1, name: "Technology" },
      image: "",
    },
    {
      _id: 2,
      name: "How to be professional 2?",
      author: { _id: 2, firstname: "Mahmoud", lastname: "Alsaied" },
      category: { _id: 1, name: "Technology" },
      image: "",
    },
    {
      _id: 3,
      name: "How to be professional 3?",
      author: { _id: 1, firstname: "Muhammad", lastname: "Alsaied" },
      category: { _id: 1, name: "Technology" },
      image: "",
    },
  ],
  currentBook: {
    name: "",
  },

  isAuthorModal: false,
  authors: [
    {
      _id: 1,
      firstname: "Muhammad",
      lastname: "Alsaied",
      dob: new Date(),
      image: "",
    },
    {
      _id: 2,
      firstname: "Mahmoud",
      lastname: "Alsaied",
      dob: new Date(),
      image: "",
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
  }
  return state;
};
