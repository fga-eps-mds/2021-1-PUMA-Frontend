// import ProjectService from '../../services/projectService';
// eslint-disable-next-line import/no-unresolved
import ProjectCard from '@/components/ProjectCard.vue';

// const projectService = new ProjectService();
// eslint-disable-next-line import/no-unresolved
const PICTURE = require('@/assets/logo-unb.png');

export default {
  components: {
    ProjectCard,
  },
  name: 'Evaluate',
  data() {
    return {
      id: 1,
      subjects: [{
        name: 'teste',
        detail: 'hehe',
        picture: PICTURE,
        is_last: true,
      }],
    };
  },
  created() {
    this.subjects.unshift({
      name: 'teste inicio',
      detail: 'hehe inicial',
      picture: PICTURE,
      is_last: false,
    });
  },
  methods: {
    subjDetail(id) {
      // Ir para detalhamento de disciplina
      this.$router.push({ name: 'Approval', params: { projId: id, parentSubj: 1 } });
    },
  },
};
