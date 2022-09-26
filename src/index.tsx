import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";

import App from "./App";
import { SearchBarProvider } from "./context/SearchBar.context";

import "./index.css";
import { TokenProvider } from "./hooks/useToken";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenProvider>
        <SearchBarProvider>
          <App />
        </SearchBarProvider>
      </TokenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
