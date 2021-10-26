import SubjectService from '../../../services/subjectService';
import SubareaService from '../../../services/subareaService';

const subjectService = new SubjectService();
const subareaService = new SubareaService();

function evaluateRegister(subjectObject) {
  if (!(
    subjectObject.name
    && subjectObject.coursesyllabus
    && subjectObject.operacao
    && subjectObject.nameTeacher
    && subjectObject.semester
    && subjectObject.academicYear
    && subjectObject.turma
  )) {
    alert('Preencha todos os campos');
    return false;
  }
  return true;
}

export default {
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

    subareaService.getSubareas().then((response) => {
      response.data.response.forEach((subarea) => {
        this.subareas.push(subarea);
      });
    });

    if (this.isUpdate) {
      subjectService.getSubject(this.subjectid).then((response) => {
        this.ementa.val = response.data.data.response[0].coursesyllabus.trim();
        this.nomeDisciplina = response.data.data.response[0].name.trim();
        response.data.data.response.forEach((subject) => {
        // eslint-disable-next-line max-len
          this.subareasSelecionadas.val.push({ description: subject.description, subareaid: subject.subareaid });
        });
      });
    }
  },
  data() {
    return {
      nomeDisciplina: '',
      ementa: { val: '', isValid: true },
      operacao: '',
      isLoading: false,
      subjectid: null,
      subareas: [],
      subareasSelecionadas: { val: [], isValid: true },
      subareasObject: [],
      formIsValid: '',
      isRegister: false,
      greetings: 'Nova Disciplina',
      submitButtonText: 'Cadastrar Disciplina',
      password: '',
      nameTeacher: '',
      semester: '',
      academicYear: '',
      turma: '',
      isUpdate: false,
    };
  },

  methods: {
    submitForm() {
      this.subareasSelecionadas.val.forEach((sub) => {
        this.subareas.forEach((subarea) => {
          if (subarea.description === sub.description) {
            this.subareasObject.push({ description: sub.description, subareaid: sub.subareaid });
          }
        });
      });
      const subjectObject = {
        name: this.nomeDisciplina,
        coursesyllabus: this.ementa.val,
        subareas: this.subareasObject,
        operacao: this.operacao,
        subjectid: this.subjectid,
        nameTeacher: this.nameTeacher,
        semester: this.semester,
        academicYear: this.academicYear,
        turma: this.turma,
        password: this.password,
      };
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
