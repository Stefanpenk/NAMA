import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";

import App from "./App";
import { SearchBarProvider } from "./context/SearchBar.context";
import { AuthProvider } from "./context/Auth.context";
import { TokenProvider } from "./context/Token.context";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenProvider>
        <AuthProvider>
          <SearchBarProvider>
            <App />
          </SearchBarProvider>
        </AuthProvider>
      </TokenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
