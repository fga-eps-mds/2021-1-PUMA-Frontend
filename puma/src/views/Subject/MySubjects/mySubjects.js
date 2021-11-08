import SubjectService from '../../../services/subjectService';
// eslint-disable-next-line import/no-unresolved
import ProjectCard from '../../../components/ProjectCard.vue';

const subjectService = new SubjectService();

export default {
  components: {
    ProjectCard,
  },
  name: 'MySubjects',
  data() {
    return {
      subjects: [],
    };
  },
  created() {
    subjectService.getSubjects().then((res) => {
      res.data.response.forEach((element) => {
        this.subjects.push({ ...element, is_last: false, submit: this.doNothing });
      });
      this.subjects.push({ is_last: true, submit: this.goToNewSubject });
    });
  },
  methods: {
    goToNewSubject() {
      this.$router.push({ name: 'Cadastro de Disciplina', params: { cadastro: 'cadastro' } });
    },
    doNothing() {
      // pass
    },
    subjectDetails(subject) {
      this.$router.push({
        name: 'Disciplina',
        params: {
          subjectId: subject.id,
        },
      });
    },
  },
};
