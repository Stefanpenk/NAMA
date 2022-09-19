import { createContext, useState } from "react";
import { PopularRecipee } from "../routes/meals/meals.component";

export const SearchBarContext = createContext<any>({
  meals: [],
  setMeals: () => {},
});

export const SearchBarProvider = ({ children }: any) => {
  const [meals, setMeals] = useState<PopularRecipee[]>([]);

  const value = { meals, setMeals };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
};
