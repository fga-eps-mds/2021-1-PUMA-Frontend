/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import axios from '../main';

export default class SubjectService {
  addSubject(subject) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/subject`, subject).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/disciplina/cadastro reject: ${response}`);
      });
    });
  }

  updateSubject(subject) {
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/subject`, subject).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/disciplina/update reject: ${response}`);
      });
    });
  }

  getSubjects() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/subject`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/disciplina reject: ${response}`);
      });
    });
  }

  async getSubject(subjectIdParam) {
    const subject = await axios.get(`${global.URL_GATEWAY}/subject/getSubject/${subjectIdParam}`);
    return subject.data.response[0];
  }
}
