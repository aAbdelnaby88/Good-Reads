import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import adminReducer from "./adminHomeReducer";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  admin: adminReducer,
});
