import { createContext, useState } from "react";
import { ContextSearchBarProps, DetailsProps, Props } from "../types/types";

export const SearchBarContext = createContext<ContextSearchBarProps>({
  meals: [],
  status: 0,
  zeroTotalResults: false,
  setStatus: () => {},
  setZeroTotalResults: () => {},
  setMeals: () => {},
});

export const SearchBarProvider: React.FC<Props> = ({ children }) => {
  const [meals, setMeals] = useState<DetailsProps[]>([]);
  const [status, setStatus] = useState(0);
  const [zeroTotalResults, setZeroTotalResults] = useState(false);

  const value = {
    meals,
    status,
    zeroTotalResults,
    setStatus,
    setZeroTotalResults,
    setMeals,
  };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
};
