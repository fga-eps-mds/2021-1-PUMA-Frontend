import ProjectService from '../../services/projectService';

const projectService = new ProjectService();

export default {
  components: { },
  name: 'Evaluate',
  data() {
    return { };
  },
  created() {
    projectService.getAllocatedProjects(1).then((lel) => {
      console.log(lel);
    });
  },
  methods: { },
};
