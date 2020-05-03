import {
  UPDATE_ADMIN_PROPS,
  DELETE_ADMIN_PROPS,
  MERGE_ADMIN_PROPS,
} from "./types";
import axios from "axios";

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
