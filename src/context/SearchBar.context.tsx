import { createContext, useState } from "react";
import { DetailsProps, Props } from "../types/types";

export const SearchBarContext = createContext<any>({
  meals: [],
  setMeals: () => {},
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
