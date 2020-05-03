import { UPDATE_REGISTER_FIELD } from "../actions/types";

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  isConfirmPasswordInvalid: false,
  image: "",
};

export default (state = INITIAL_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
    case UPDATE_REGISTER_FIELD:
      const { key, value } = action.payload;
      newState[key] = value;
      break;
  }
  return newState;
};
