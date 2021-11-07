import SubjectService from '../../../services/subjectService';
// eslint-disable-next-line import/no-unresolved
import ProjectCard from '@/components/ProjectCard.vue';

const subjectService = new SubjectService();

export default {
  components: {
    ProjectCard,
  },
  name: 'My Subjects',
  data() {
    return {
      subjects: [],
    };
  },
  created() {
    subjectService.getSubjects().then((res) => {
      console.log(res.data);
    });
  },
  methods: {
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
