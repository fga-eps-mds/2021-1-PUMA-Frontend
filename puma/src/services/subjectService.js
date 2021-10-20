/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import axios from '../main';

export default class SubjectService {
  addSubject(subject) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/disciplina/cadastro`, subject).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/disciplina/cadastro reject: ${response}`);
      });
    });
  }

  getSubjects() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/disciplina`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/disciplina reject: ${response}`);
      });
    });
  }

  getSubject(subjectIdParam) {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/disciplina/consulta/${subjectIdParam}`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/disciplina/cadastro reject: ${response}`);
      });
    });
  }
}
