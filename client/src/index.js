import React from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="550802222960-ms0cmmoqc54h5odgc5bsu6pl4hbm28uq.apps.googleusercontent.com">
      {/* {console.log(
          "process.env.GOOGLE_API_TOKEN",
          process.env.REACT_APP_GOOGLE_API_TOKEN
        )} */}
      <App />
    </GoogleOAuthProvider>
    <ToastContainer />
  </Provider>
);