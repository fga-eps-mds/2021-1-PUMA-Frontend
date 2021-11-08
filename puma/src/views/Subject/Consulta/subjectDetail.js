import SubjectService from '../../../services/subjectService';
import ProjectService from '../../../services/projectService';
import UserService from '../../../services/userService';
import ProjectCard from '../../../components/ProjectCard.vue';

const subjectService = new SubjectService();
const projectService = new ProjectService();
const userService = new UserService();

export default {
  components: {
    ProjectCard,
  },
  name: 'SubjectDetail',
  data() {
    return {
      subject: {},
      projLen: '',
      userType: '',
    };
  },
  created() {
    subjectService.getSubject(this.$route.params.idDisciplina).then((response) => {
      this.subject = response;
      projectService.getAllocatedProjects(this.subject.subjectid).then((project) => {
        this.subject.projects = project.data;
        this.projLen = Object.keys(this.subject.projects).length;
      });
    });
    this.subject.userType = userService.getUserType();
  },
};
