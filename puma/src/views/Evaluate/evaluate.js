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
    return {};
  },
  created() {
    projectService.getAllocatedProjects(1).then((lel) => {
      console.log(lel);
    });
  },
  methods: {},
};
