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

      axios.post(`${global.URL_GATEWAY}/aluno`, user).then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    });
  }
}