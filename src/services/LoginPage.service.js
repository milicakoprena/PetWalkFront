import base from "./base.service";

export const login = (username, password) =>
  instance.post("/Prijavi se", { username, password }).then((res) => {
    const user = res.data;
    sessionStorage.setItem("auth", user.token);
    return { ...user, token: null };
  });

  