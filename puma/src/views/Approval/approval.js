/* eslint-disable import/no-unresolved */
import ProjectService from '../../services/projectService';
import EvaluateModal from '@/components/EvaluateModal.vue';

const projectService = new ProjectService();

export default {
  components: {
    EvaluateModal,
  },
  name: 'Approval',
  data() {
    return {
      id: this.$route.params.projId,
      responsibleName: '',
      responsiblePhone: '',
      title: '',
      projExpectedResult: '',
      projProblem: '',
      knowledgeAreas: ['shonk shonk', 'onk', 'fonk'],
      showModal: true,
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
  methods: {
    evaluate() {
      this.showModal = !this.showModal;
      console.log('shit');
    },
  },
};
