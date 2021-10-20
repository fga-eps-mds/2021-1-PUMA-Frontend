import ProjectService from '../../services/projectService';
// eslint-disable-next-line import/no-unresolved
import ProjectCard from '@/components/ProjectCard.vue';

const projectService = new ProjectService();

export default {
  components: {
    ProjectCard,
  },
  name: 'Evaluate',
  data() {
    return {
      projs: [],
    };
  },
  created() {
    projectService.getAllocatedProjects(1).then((res) => {
      this.projs = res.data;
    });
  },
  methods: {
    projDetail(id) {
      this.$router.push({ name: 'Approval', params: { projId: id } });
    },
  },
};
