import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";

import App from "./App";
import { SearchBarProvider } from "./context/SearchBar.context";

import "./index.css";
import { TokenProvider } from "./hooks/useToken";
import { FavRecipesProvider } from "./context/MyRecipes.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenProvider>
        <FavRecipesProvider>
          <SearchBarProvider>
            <App />
          </SearchBarProvider>
        </FavRecipesProvider>
      </TokenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
