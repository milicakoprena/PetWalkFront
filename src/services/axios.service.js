import { createAxiosClient } from "./axiosClient.js";

export const BASE_URL = "http://localhost:9000";
//export const BASE_URL = "http://192.168.100.8:9000";
function getToken() {
  try {
    const token = JSON.parse(sessionStorage.getItem("user")).token;
    console.log(token);
    return token;
  } catch (ex) {
    console.log("no token");
    return "NO_TOKEN";
  }
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
  },
  getToken,
});