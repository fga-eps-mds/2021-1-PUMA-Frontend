import ProjectService from '../../services/projectService';

const projectService = new ProjectService();

export default {
  name: 'Approval',
  data() {
    return {
      id: this.$route.params.projId,
      responsibleName: '',
      responsiblePhone: '',
      title: '',
      projExpectedResult: '',
      projProblem: '',
      knowledgeAreas: [],
    };
  },
  created() {
    projectService.getProjById(this.id).then((res) => {
      const parsedData = res.data;
      this.responsibleName = parsedData.fullname;
      this.responsiblePhone = parsedData.phonenumber;
      this.title = parsedData.name;
      this.projExpectedResult = parsedData.expectedresult;
      this.projProblem = parsedData.problem;
    });
  },
  methods: {},
};
