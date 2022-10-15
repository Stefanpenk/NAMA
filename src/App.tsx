import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import About from "./routes/about/about.component";
import Authentication from "./routes/authentication/authentication.component";
import Cuisines from "./routes/cuisines/cuisines.component";
import Recipe from "./routes/recipe/recipe.component";
import Meals from "./routes/meals/meals.component";
import Profile from "./routes/profile/profile.component";
import RequireAuth from "./components/RequireAuth/RequireAuth.component";
import Admin from "./routes/admin/admin.component";
import RequireAdminAuth from "./components/RequireAdminAuth/RequireAdminAuth.component";
import Blog from "./routes/blog/blog.component";
import Article from "./routes/article/article.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/recipe/:search" element={<Recipe />} />
        <Route path="/about" element={<About />} />
        <Route path="/meals/:type" element={<Meals />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/cuisines/:cuisine" element={<Cuisines />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/article/:id" element={<Article />} />
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <Admin />
            </RequireAdminAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
