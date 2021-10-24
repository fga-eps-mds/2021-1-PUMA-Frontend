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
      subjectArray: [{ name: 'Nenhuma', id: 0 }],
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
      this.knowledgeAreas = parsedData.areas;
    });
    projectService.getAllSubjects().then((res) => {
      const parsedData = res.data;
      this.subjectArray = this.subjectArray.concat(parsedData);
    });
  },
  methods: {
    evaluate() {
      this.showModal = !this.showModal;
    },
    submitReallocate(subjectId) {
      if (subjectId > 0) {
        projectService.putProposal(this.id, subjectId).then(() => {
          this.$router.push({ name: 'Evaluate', params: { subjectId: this.parentId } });
        });
      } else {
        projectService.putProposalStatus(this.id, false).then(() => {
          this.$router.push({ name: 'Evaluate', params: { subjectId: this.parentId } });
        });
      }
    },
    submitApprove() {
      projectService.putProposalStatus(this.id, true).then(() => {
        this.$router.push({ name: 'Evaluate', params: { subjectId: this.parentId } });
      });
    },
  },
};
