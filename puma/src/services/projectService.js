import axios from '../main';

export default class ProjectService {
  // eslint-disable-next-line class-methods-use-this
  addProject(project) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/projeto/cadastro`, project).then((response) => {
        resolve(response);
      }).catch((response) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`/projeto/cadastro reject: ${response}`);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addFile(file) {
    // const aux = [];
    // // eslint-disable-next-line guard-for-in,no-restricted-syntax
    // for (const t in file) {
    //   aux.push(file[t]);
    // }
    // console.log(file);
    // console.log(aux);
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
