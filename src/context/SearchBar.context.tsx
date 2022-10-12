import { createContext, useState } from "react";
import { ContextSearchBarProps, DetailsProps, Props } from "../types/types";

export const SearchBarContext = createContext<ContextSearchBarProps>({
  meals: [],
  setMeals: (meals) => {},
});

export const SearchBarProvider: React.FC<Props> = ({ children }) => {
  const [meals, setMeals] = useState<DetailsProps[]>([]);

  const value = { meals, setMeals };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
};
