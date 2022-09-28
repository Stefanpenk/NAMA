import { createContext, useState } from "react";
import { DetailsProps } from "../types/types";

export const SearchBarContext = createContext<any>({
  meals: [],
  setMeals: () => {},
});

export const SearchBarProvider = ({ children }: any) => {
  const [meals, setMeals] = useState<DetailsProps[]>([]);

  const value = { meals, setMeals };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
};
