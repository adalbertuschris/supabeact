import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./g11n/i18n";
import App from "./App.tsx";
import "./index.css";
import { store } from "./core/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
