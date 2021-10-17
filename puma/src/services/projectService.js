/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import axios from '../main';

export default class ProjectService {
  addProject(project) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/projeto/cadastro`, project).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/projeto/cadastro reject: ${response}`);
      });
    });
  }

  addFile(file) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/upload`, file).then((response) => {
        resolve(response);
      }).catch(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('erro no upload do arquivo');
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  deleteProject(idprojeto) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/projeto/deletar`, idprojeto).then((response) => {
        resolve(response);
      }).catch(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('erro na deleção do arquivo');
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getKnowledgeAreas() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/areas-conhecimento`).then((response) => {
        resolve(response);
      }).catch(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('erro na deleção do arquivo');
      });
    });
  }
}
