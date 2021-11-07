import ProjectService from '../../../services/projectService';
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
  methods: {
    goToNewProposal() {
      this.$router.push({ name: 'Cadastro de Projeto' });
    },
    doNothing() {
      // pass
    },
  },
  created() {
    projectService.getMyProposals().then((proposals) => {
      proposals.data.forEach((element) => {
        this.projs.push({ ...element, is_last: false, submit: this.doNothing });
      });
      // this.projs = proposals.data;
      this.projs.push({ is_last: true, submit: this.goToNewProposal });
    });
  },
};
