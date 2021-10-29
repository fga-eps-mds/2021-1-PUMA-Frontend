/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as Cookie from 'js-cookie';
import axios from '@/main.js';

export default class UserService {
  registerUser(newUser) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/user/register`, newUser).then((response) => {
        resolve(`/register resolve: ${response}`);
      }).catch((response) => {
        reject(`/register reject: ${response}`);
      });
    });
  }

  logUserIn(newUser) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/user/login`, newUser).then((response) => {
        if (response.data.auth) {
          Cookie.set('PUMA_USER_TYPE', response.data.type, { expires: 7, path: '/' });
          Cookie.set('PUMA_USER_SESSION', response.data.token, { expires: 7, path: '/' });
          resolve(`/login resolve: ${response}`);
        } else {
          reject(`/login reject: ${response}`);
        }
      }).catch((response) => {
        reject(`/login reject: ${response}`);
      });
    });
  }

  logUserOut() {
    Cookie.remove('PUMA_USER_TYPE');
    Cookie.remove('PUMA_USER_SESSION');
  }

  isUserLoggedIn() {
    return Cookie.get('PUMA_USER_SESSION') !== undefined;
  }
}
