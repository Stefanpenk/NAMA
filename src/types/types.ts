export type DetailsProps = {
  title: string;
  diets: string[];
  image: string;
  readyInMinutes: number;
  id: number;
  extendedIngredients: { id: number; original: string }[];
  analyzedInstructions: {
    name: string;
    steps: { number: number; step: string }[];
  }[];
  summary: string;
  vegetarian?: boolean;
  vegan?: boolean;
  dairyFree?: boolean;
  glutenFree?: boolean;
};

export type TokenProps = {
  token: string;
  name: string;
  username: string;
  recipes: DetailsProps;
};

export type RecipeNavProps = {
  handleSave: () => void;
  handleGoBack: () => void;
  readyInMinutes: number;
  id: number;
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export type Response = {
  recipes: DetailsProps[];
};

export type CardProps = {
  item: DetailsProps;
};

export type CardListProps = {
  popular: DetailsProps[];
  title: string;
};

export type MealListProps = {
  meals: DetailsProps[];
};

export interface SearchBarProps {
  Button1: any;
  Button2: any;
  Button3: any;
  Button4: any;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  to1: string;
  to2: string;
  to3: string;
  to4: string;
}

export type Responses = {
  results: DetailsProps[];
};
