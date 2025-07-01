import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { initializeAppData } from "./app/initializeAppData";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import "./styles/main.css";

// ⚠️ Llama a la función que inicializa los datos globales
initializeAppData(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);