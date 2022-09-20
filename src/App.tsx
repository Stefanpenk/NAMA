import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import About from "./routes/about/about.component";
import Authentication from "./routes/authentication/authentication.component";
import Cuisines from "./routes/cuisines/cuisines.component";
import Recipe from "./components/Recipe/recipe.component";
import Meals from "./routes/meals/meals.component";
import Learn from "./routes/learn/learn.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/recipe/:search" element={<Recipe />} />
        <Route path="/about" element={<About />} />
        <Route path="/meals/:meal" element={<Meals />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/cuisines/:cuisine" element={<Cuisines />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/learn" element={<Learn />} />
      </Route>
    </Routes>
  );
};

export default App;
