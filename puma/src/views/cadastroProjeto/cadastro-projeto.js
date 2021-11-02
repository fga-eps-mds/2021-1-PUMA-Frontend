import ProjectService from '../../services/projectService';

const projectService = new ProjectService();
let selectedAreasConhecimento = [];

export default {
  name: 'ProjectRegister',
  data() {
    return {
      fonk: '',
      titulo: { val: '', isValid: true },
      descricao: { val: '', isValid: true },
      resultadoEsperado: { val: '', isValid: true },
      operacao: { val: '', isValid: true },
      formIsValid: '',
      file: { val: '', isValid: true },
      isLoading: false,
      areasConhecimento: [],
      selectedAreasConhecimento,
      areasConhecimentoSelecionadas: { val: selectedAreasConhecimento, isValid: true },
      areasConhecimentoObject: [],
    };
  },
  beforeCreate() {
    projectService.getKnowledgeAreas().then((response) => {
      response.data.response.forEach((areaConhecimento) => {
        this.areasConhecimento.push(areaConhecimento);
      });
    });
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
      if (!this.validateFormData()) {
        alert('Preencha todos os campos, selecione pelo menos uma área de conhecimento e submeta um arquivo.');
        return;
      }
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
      console.log(this.titulo.val);
      const projectObject = {
        name: this.titulo.val,
        problem: this.descricao.val,
        expectedresult: this.resultadoEsperado.val,
        status: 'Em alocacao',
        subjectid: 1,
        userid: 1,
        isLoading: false,
        knowledgeareas: aux,
      };
      projectService.addProject(projectObject).then(async (response) => {
        this.isLoading = true;
        const projectId = response.data.data.response;
        const fileByteArray = await this.getFileByteContent();
        const file = {
          filename: this.file.val.name,
          bytecontent: fileByteArray,
          projectid: projectId,
        };
        projectService.addFile(file).then(() => {
          this.isLoading = false;
          this.$router.push({ name: 'My Proposals' });
        }).catch(() => {
          this.isLoading = false;
          alert('erro no cadastro de arquivo');
        });
      }).catch(() => {
        this.isLoading = false;

        alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
      });
    },
    updateFile(event) {
      if (!event.target.files[0]) {
        this.file.val = null;
        this.file.isValid = false;
      } else {
        // eslint-disable-next-line prefer-destructuring
        this.file.val = event.target.files[0];
        this.file.isValid = true;
      }
    },
    getFileByteContent() {
      return new Promise((resolve) => {
        const reader = new FileReader();
        const fileByteArray = [];
        reader.readAsArrayBuffer(this.file.val);
        // eslint-disable-next-line consistent-return
        reader.onloadend = (evt) => {
          if (evt.target.readyState === FileReader.DONE) {
            const arrayBuffer = evt.target.result;
            const array = new Uint8Array(arrayBuffer);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < array.length; i++) {
              fileByteArray.push(array[i]);
            }
            resolve(fileByteArray);
          }
        };
      });
    },
    validateFormData() {
      this.formIsValid = true;
      this.titulo.isValid = this.titulo.val;
      this.titulo.isValid = true;
      this.descricao.isValid = this.descricao.val;
      this.resultadoEsperado.isValid = this.resultadoEsperado.val;
      this.file.isValid = this.file.val;
      this.areasConhecimentoSelecionadas.isValid = this.areasConhecimentoSelecionadas.val.length;
      if (!this.titulo.isValid
        || !this.descricao.isValid
        || !this.resultadoEsperado.isValid
        || !this.file.isValid
        || !this.areasConhecimentoSelecionadas.isValid
      ) {
        this.formIsValid = false;
      }
      return this.formIsValid;
    },
    validateFormInput(input) {
      if (input === 'areaConhecimento') {
        // eslint-disable-next-line max-len
        this.areasConhecimentoSelecionadas.isValid = !!this.areasConhecimentoSelecionadas.val.length;
      } else {
        this[input].isValid = this[input].val;
      }
    },
  },
};
