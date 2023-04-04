import {
    ROLE_ADMIN,
    ROLE_OWNER,
    ROLE_WALKER,
    STATUS_ACTIVE,
    STATUS_BLOCKED,
    STATUS_REQUESTED,
  } from "../util.js/constants";
  import base from "./base.service";
  import { client, BASE_URL } from "./axios.service";


const instance = base.service();
const securedInstance = base.service(true);

  export const login = (username, password) =>
  instance.post("/login", { username, password }).then((res) => {
    const user = res.data;
    sessionStorage.setItem("auth", user.token);
    return { ...user, token: null };
  });


    export function signUp(user) {
      console.log(user);
      const u = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.passwordHash,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };
      instance.post("/sign-up", { u });
    }
  

  

  export const state = () => {
    return securedInstance.get("/state").then((res) => res.data);
  };

  export const logout = () => sessionStorage.removeItem("auth");

  export const getAll = () =>
  securedInstance.get("/korisnici").then((res) => res.data);

  export const update = (user) =>
  securedInstance.put(`/korisnici/${user.id}`, user).then((res) => res.data);

  export const changeStatus = (user) => {
    const request = {
      id: user.id,
    };
    if (user.status === STATUS_REQUESTED) request.status = STATUS_ACTIVE;
    else if (user.status === STATUS_ACTIVE) request.status = STATUS_BLOCKED;
    else request.status = STATUS_ACTIVE;
    return securedInstance
      .patch(`/korisnici/${user.id}/status`, request)
      .then(() => request);
  };

  export const changeRole = (user) => {
    const request = {
      id: user.id,
      role: user.role === ROLE_OWNER ? ROLE_WALKER : ROLE_OWNER,
    };
    return securedInstance
      .patch(`/korisnici/${user.id}/role`, request)
      .then(() => request);
  };

  export default {
    login,
    state,
    logout,
    getAll,
    update,
    changeStatus,
    changeRole,
    signUp,
  };
