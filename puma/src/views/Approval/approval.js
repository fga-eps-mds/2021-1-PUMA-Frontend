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
      parentId: this.$route.params.parentSubj,
      responsibleName: '',
      responsiblePhone: '',
      title: '',
      projExpectedResult: '',
      projProblem: '',
      knowledgeAreas: ['shonk shonk', 'onk', 'fonk'],
      showModal: true,
      subjectArray: [{ name: 'onoask' }],
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
    projectService.getAllSubjects().then((res) => {
      const parsedData = res.data;
      this.subjectArray = parsedData;
      // console.log(res.data);
    });
  },
  methods: {
    evaluate() {
      this.showModal = !this.showModal;
    },
    submit(subjectId) {
      projectService.putProposal(this.id, subjectId).then(() => {
        this.$router.push({ name: 'Evaluate', params: { subjectId: this.parentId } });
      });
    },
  },
};
