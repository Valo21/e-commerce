import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import { Provider } from "react-redux";
import store, { persistor } from "@store/index";
import { PersistGate } from "redux-persist/integration/react";
import App from "@frontend/App";

const rootElement: HTMLElement | null = document.getElementById("root");


if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
