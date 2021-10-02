import axios from "@/main.js";

export default class UserService {
  registerUser(name, email, password, type, matricula) {
    return new Promise((resolve, reject) => {
      const user = {
        name,
        email,
        password,
        type,
        matricula,
      }

      axios.post(`${global.URL_GATEWAY}/register`, user).then((response) => {
        resolve("/register resolve: " + response);
      }).catch((response) => {
        reject("/register reject: " + response);
      });
    });
  }

  logUserIn(email, password) {
    return new Promise((resolve, reject) => {

      const user = {
        email,
        password,
      }

      axios.post(`${global.URL_GATEWAY}/login`, user).then((response) => {
        resolve("/login resolve: " + response);
      }).catch((response) => {
        reject("/login reject: " + response);
      });
    });
  }
}