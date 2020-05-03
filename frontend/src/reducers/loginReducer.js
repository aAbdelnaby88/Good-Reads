import { UPDATE_LOGIN_FIELD, UPDATE_USER_INFO } from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  isLoggedIn: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
    case UPDATE_LOGIN_FIELD:
      const { key, value } = action.payload;
      newState[key] = value;
      break;
    case UPDATE_USER_INFO:
      const user = action.payload.user;
      newState["user"] = user;
  }
  return newState;
};