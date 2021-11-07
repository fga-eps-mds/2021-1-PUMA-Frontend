import SubjectService from '../../../services/subjectService';
// import SubareaService from '../../../services/subareaService';
import ProjectService from '../../../services/projectService';

const subjectService = new SubjectService();
const projectService = new ProjectService();
// const subareaService = new SubareaService();
let selectedAreasConhecimento = [];

function evaluateRegister(subjectObject) {
  if (
    subjectObject.name
    && subjectObject.coursesyllabus
    && subjectObject.operacao
    && subjectObject.nameTeacher
    && subjectObject.knowledgearea
    && subjectObject.semester
    && subjectObject.academicYear
    && subjectObject.turma
    && subjectObject.accessPassword
  ) {
    alert('Preencha todos os campos');
    return false;
  }
  return true;
}

export default {
  beforeCreate() {
    projectService.getKnowledgeAreas().then((response) => {
      response.data.response.forEach((areaConhecimento) => {
        this.areasConhecimento.push(areaConhecimento);
      });
    });
  },
  created() {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in this.$route.params) {
      if (key !== 'cadastro' && key !== 'alteracao') {
        this.subjectid = this.$route.params[key];
      } else {
        this.operacao = this.$route.params[key];
      }
    }

    if (this.operacao === 'cadastro') {
      this.isRegister = true;
      this.isUpdate = false;
    } else {
      this.isRegister = false;
      this.isUpdate = true;
    }

    if (this.isRegister) {
      this.greetings = 'Nova Disciplina';
      this.submitButtonText = 'Cadastrar Disciplina';
    } else {
      this.greetings = 'Alteração de Disciplina';
      this.submitButtonText = 'Alterar Disciplina';
    }

    if (this.isUpdate) {
      subjectService.getSubject(this.subjectid).then((response) => {
        this.nomeDisciplina = response.name;
        this.nameTeacher = response.nameTeacher;
        this.ementa.val = response.coursesyllabus;
        this.semester = response.semester;
        this.academicYear = response.academicYear;
        this.turma = response.class;
        response.knowledgeArea[0].forEach((areaConhecimento) => {
          selectedAreasConhecimento.push(areaConhecimento.knowledgeareaid);
        });
        this.areasConhecimentoSelecionadas.val = selectedAreasConhecimento;
      });
    }
  },
  data() {
    return {
      newSubject: {},
      nomeDisciplina: '',
      ementa: { val: '', isValid: true },
      operacao: '',
      isLoading: false,
      subjectid: null,
      areasConhecimento: [],
      selectedAreasConhecimento,
      areasConhecimentoSelecionadas: { val: selectedAreasConhecimento, isValid: true },
      areasConhecimentoObject: [],
      formIsValid: '',
      isRegister: false,
      greetings: 'Nova Disciplina',
      submitButtonText: 'Cadastrar Disciplina',
      accessPassword: '',
      professorRegNumber: '',
      semester: '',
      academicYear: '',
      turma: '',
      isUpdate: false,
    };
  },

  methods: {
    beGay(lel) {
      if (selectedAreasConhecimento.includes(lel)) {
        selectedAreasConhecimento = selectedAreasConhecimento
          .filter((value) => value !== lel);
      } else {
        selectedAreasConhecimento.push(lel);
      }
      this.areasConhecimentoSelecionadas.val = selectedAreasConhecimento;
    },
    whoAmI(lel) {
      if (this.areasConhecimentoSelecionadas.val.includes(lel)) {
        return ('fuck');
      }
      return ('notfuck');
    },
    submitForm() {
      this.areasConhecimentoObject = [];
      this.areasConhecimentoSelecionadas.val.forEach((areaConhecimento) => {
        this.areasConhecimento.forEach((area) => {
          if (area.knowledgeareaid === areaConhecimento) {
            this.areasConhecimentoObject.push({
              knowledgearea: area.knowledgearea,
              knowledgeareaid: area.knowledgeareaid,
              selected: false,
            });
          }
        });
      });
      const aux = [];
      this.areasConhecimentoObject.forEach((area) => {
        aux.push({ knowledgearea: area.knowledgearea, knowledgeareaid: area.knowledgeareaid });
      });
      const subjectObject = {
        name: this.nomeDisciplina,
        coursesyllabus: this.ementa.val,
        knowledgearea: aux,
        operacao: this.operacao,
        subjectid: this.subjectid,
        professorRegNumber: this.nameTeacher,
        semester: this.semester,
        academicYear: this.academicYear,
        class: this.turma,
        accessPassword: this.accessPassword,
      };
      console.log(subjectObject);
      if (this.isRegister) {
        if (evaluateRegister(subjectObject)) {
          this.isLoading = true;
          subjectService.addSubject(subjectObject).then(async (response) => {
            this.isLoading = false;
            console.log(response);
            alert('Deu certo');
          }).catch((response) => {
            console.log(response);
            this.isLoading = false;
          });
        }
      } else {
        this.isLoading = true;
        subjectService.updateSubject(subjectObject).then(async (response) => {
          this.isLoading = false;
          console.log(response);
        }).catch((response) => {
          console.log(response);
          this.isLoading = false;
        });
      }
    },
    validateFormInput(input) {
      if (input === 'subareasSelecionadas') {
        this.subareasSelecionadas.isValid = this.subareasSelecionadas.val.length;
      } else {
        this[input].isValid = this[input].val;
      }
    },
  },
};
