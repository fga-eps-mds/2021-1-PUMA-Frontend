/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import axios from '../main';

export default class SubareaService {
  getSubareas() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/subareas-conhecimento`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/subareas-conhecimento reject: ${response}`);
      });
    });
  }
}
