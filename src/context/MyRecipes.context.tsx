import { createContext, useState } from "react";

export const FavRecipesContext = createContext<any>(null as any);

export const FavRecipesProvider = ({ children }: any) => {
  const getRecipes = () => {
    const check = localStorage.getItem("favRecipes");
    if (check) {
      const Recipes: any = localStorage.getItem("favRecipes")!;
      const userRecipes = JSON.parse(Recipes);
      return userRecipes?.recipes;
    } else return null;
  };

  const [favRecipes, setFavRecipes] = useState(getRecipes());

  const saveRecipes = (userRecipes: {
    recipes: [id: number, image: string, title: string];
  }) => {
    localStorage.setItem("favRecipes", JSON.stringify(userRecipes));
    setFavRecipes(userRecipes.recipes);
  };

  const value = { favRecipes, saveRecipes };

  return (
    <FavRecipesContext.Provider value={value}>
      {children}
    </FavRecipesContext.Provider>
  );
};
