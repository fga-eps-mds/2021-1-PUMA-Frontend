/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import * as Cookie from 'js-cookie';
import axios from '@/main.js';

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
        reject('erro no upload do arquivo');
      });
    });
  }

  deleteProject(idprojeto) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/projeto/deletar`, idprojeto).then((response) => {
        resolve(response);
      }).catch(() => {
        reject('erro na deleção do arquivo');
      });
    });
  }

  getKnowledgeAreas() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/areas-conhecimento`).then((response) => {
        resolve(response);
      }).catch(() => {
        reject('erro na deleção do arquivo');
      });
    });
  }

  async getAllocatedProjects(subjctId) {
    const auth = Cookie.get('PUMA_USER_SESSION');
    const allocatedArray = await axios.get(`${global.URL_GATEWAY}/project/alocated/${subjctId}`, {
      headers: {
        auth,
      },
    });
    return allocatedArray;
  }

  async getProjById(projId) {
    const auth = Cookie.get('PUMA_USER_SESSION');
    const projInfos = await axios.get(`${global.URL_GATEWAY}/project/project/${projId}`, {
      headers: {
        auth,
      },
    });
    return projInfos;
  }

  async getAllSubjects() {
    const auth = Cookie.get('PUMA_USER_SESSION');
    const subjects = await axios.get(`${global.URL_GATEWAY}/project/subject`, {
      headers: {
        auth,
      },
    });
    return subjects;
  }

  async putProposal(projectId, subjId) {
    const auth = Cookie.get('PUMA_USER_SESSION');
    const subjects = await axios.put(`${global.URL_GATEWAY}/project/proposal/${projectId}`,
      { subjectId: subjId },
      {
        headers: {
          auth,
        },
      });
    return subjects;
  }

  async putProposalStatus(id, status) {
    const auth = Cookie.get('PUMA_USER_SESSION');
    const subjects = await axios.put(`${global.URL_GATEWAY}/project/alocate/${id}/status`,
      { proposal: { approved: status } },
      {
        headers: {
          auth,
        },
      });
    return subjects;
  }
}
