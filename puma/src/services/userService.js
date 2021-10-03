import axios from "@/main.js";
// import * as Cookie from 'js-cookie';
// Cookie.set('USER_SESSION', res.user_session, {expires: 7, path: '/'});
// public get userValue(): User {
//   return this.userSubject.value;
// }

// public get userSession(): string {
// return Cookie.get('USER_SESSION');
// }

// public get isLoggedIn(): boolean {
// return Cookie.get('USER_SESSION') ? (Cookie.get('USER_SESSION') != '' ? true : false) : false;
// }

// public emailIsValid (email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// }

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