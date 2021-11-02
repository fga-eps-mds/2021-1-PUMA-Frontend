import ProjectService from '../../services/projectService';
// eslint-disable-next-line import/no-unresolved
import ProjectCard from '@/components/ProjectCard.vue';

const projectService = new ProjectService();

export default {
  components: {
    ProjectCard,
  },
  name: 'Approval',
  data() {
    return {
      projs: [],
    };
  },
  created() {
    projectService.getMyProposals().then((proposals) => {
      this.projs = proposals.data;
    });
  },
};
