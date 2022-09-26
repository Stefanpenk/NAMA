useEffect(() => {
  const check = sessionStorage.getItem("token");
  if (check) {
    setToken(() => {
      const tokenString: string = sessionStorage.getItem("token")!;
      // const userToken = JSON.parse(tokenString);
      // console.log(tokenString);
      return tokenString;
    });
    console.log(token);
    console.log(check);
  }
});