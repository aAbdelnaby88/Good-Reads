import { store } from "react-notifications-component";

export const APP_NAME = "Good Reads";

export const getAdminToken = () => localStorage.getItem("admin-token");

export const setAdminToken = (token) =>
  localStorage.setItem("admin-token", token);

export const API_HOST = "http://localhost:5000/api";

export const showMessage = (title, message, type) => {
  store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const handleError = (err) => {
  showMessage(
    "Error!",
    (err.response && err.response.data.message) || "Something went wrong.",
    "danger"
  );
};
