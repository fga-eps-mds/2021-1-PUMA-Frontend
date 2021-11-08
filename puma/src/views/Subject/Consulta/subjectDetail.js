import SubjectService from '../../../services/subjectService';
import ProjectCard from '../../../components/ProjectCard.vue';

const subjectService = new SubjectService();

export default {
  components: {
    ProjectCard,
  },
  name: 'SubjectDetail',
  data() {
    return {
      subject: {},
    };
  },
  created() {
    subjectService.getSubject(this.$route.params.idDisciplina).then((response) => {
      this.subject = response;
    });
  },
};
