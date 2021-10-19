/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as Cookie from 'js-cookie';
import axios from '@/main.js';

export default class ProjectService {
  async getAllocatedProjects(subjctId) {
    const auth = Cookie.get('PUMA_USER_SESSION');
    console.log(`${global.URL_GATEWAY}/project/alocated/${subjctId}`);
    const allocatedArray = await axios.get(`${global.URL_GATEWAY}/project/alocated/${subjctId}`, {
      headers: {
        auth,
      },
    });
    return allocatedArray;
  }
}
