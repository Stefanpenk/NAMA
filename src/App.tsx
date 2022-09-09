import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import PopularRecipes from "./routes/popular-recipes/popular-recipes.component";
import SearchProduct from "./routes/search-product/search-product.component";
import Authentication from "./routes/authentication/authentication.component";
import Cuisines from "./routes/cuisines/cuisines.component";
import Searched from "./routes/searched/searched.component";
import Recipe from "./components/Recipe/recipe.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/popularrecipes" element={<PopularRecipes />} />
        <Route path="/searchproduct" element={<SearchProduct />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/cuisine/:type" element={<Cuisines />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Route>
    </Routes>
  );
};

export default App;
