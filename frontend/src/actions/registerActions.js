import { UPDATE_REGISTER_FIELD} from "./types";
import axios from "axios";

export const updateRegisterField = (key, value) => (dispatch) => {
  dispatch({ type: UPDATE_REGISTER_FIELD, payload: { key, value } });
};
