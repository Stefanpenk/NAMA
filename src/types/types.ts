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
  user: string;
  profileImg: string;
  recipes: DetailsProps[];
};

export type TokenProps2 = {
  res: {
    token: string;
    name: string;
    user: string;
    profileImg: string;
    recipes: DetailsProps[];
  };
};

export type RecipeNavProps = {
  handleGoBack?: () => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  details: DetailsProps;
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
  Button1: React.SVGProps<SVGSVGElement>;
  Button2: React.SVGProps<SVGSVGElement>;
  Button3: React.SVGProps<SVGSVGElement>;
  Button4: React.SVGProps<SVGSVGElement>;
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

export type BlogProps = {
  id: string;
  title: string;
  text: string;
  imgUrl: string;
  date: string;
  rating: { user: string; number: number }[];
  author: string;
  authorImg: string;
  comments: {
    id: string;
    user: string;
    date: string;
    text: string;
    profileImg: string;
  }[];
};

export interface Props {
  children: React.ReactNode;
}

export type ArticleInfoProps = {
  article: BlogProps;
};

export type useTokenTokenProps = {
  token: TokenProps | null;
};

export type fetchedBlogData = {
  blog: BlogProps[];
};

export interface NavButtonProps {
  active: string;
  svg: React.SVGProps<SVGSVGElement>;
  dataPage: string;
  setPage: (value: string) => void;
}

export type AdminBlogCard = {
  id: string;
  title: string;
  text: string;
  date: string;
  author: string;
  authorImg: string;
  imgUrl: string;
};

export type ArchiveProps = {
  article: BlogProps;
  page: string;
};

export type PageProp = {
  page: string;
};

export type usersProps = {
  token: string;
  user: string;
  name: string;
  profileImg: string;
};

export type childrenProps = {
  children: JSX.Element;
};

export type ContextSearchBarProps = {
  meals: DetailsProps[] | [];
  setMeals: (meals: DetailsProps[]) => void;
};

export type CommentProps = {
  article: BlogProps;
};

export type ArticleObj = {
  title?: string;
  text?: string;
  comments?: string;
  imgUrl?: string;
};

export type ProfileImageProps = {
  token: TokenProps;
  saveToken: (userToken: TokenProps2) => void;
};

export type ImageInputProps = {
  url: string;
  setUrl: (url: string) => void;
};

export type LocationProps = {
  state: {
    from: Location;
  };
};

export type RegisterProps = {
  handleSwitchForms: () => void;
};

export interface ChangeParamsButtonProps {
  handleSubmit: () => void;
  svg: React.SVGProps<SVGSVGElement>;
  title: string;
  to: string;
}

export interface CheckboxProps {
  name: string;
  className: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  svg: React.SVGProps<SVGSVGElement>;
}

export type SaveProps = {
  details: DetailsProps;
  username: string;
  saveToken: (props: TokenProps2) => void;
};

export type LoginPopupModalProps = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

export type TokenContextProps = {
  token: TokenProps | null;
  saveToken: (userToken: TokenProps2) => void;
  removeToken: () => void;
};
