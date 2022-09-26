export const token = () => {
  const tokenString: string = sessionStorage.getItem("token")!;
  console.log(tokenString);
  return tokenString;
};

export const removeToken = () => {
  const check = sessionStorage.getItem("token");
  console.log(check);
  if (check) {
    sessionStorage.removeItem("token");
  }
};
