import axios from '../../main';
import ProjectService from '../../services/projectService';

const projectService = new ProjectService();

export default {
  name: 'ProjectRegister',
  data() {
    return {
      titulo: { val: '', isValid: true },
      descricao: { val: '', isValid: true },
      resultadoEsperado: { val: '', isValid: true },
      operacao: { val: '', isValid: true },
      formIsValid: '',
      file: { val: '', isValid: true },
      isLoading: false,
      areasConhecimento: [],
    };
  },
  beforeCreate() {
    axios.get(`${global.URL_GATEWAY}/areas-conhecimento`).then((response) => {
      response.data.forEach((areaConhecimento) => {
        this.areasConhecimento.push(areaConhecimento);
      });
      console.log(this.areasConhecimento);
    });
  },
  methods: {
    submitForm() {
      if (this.validateFormData()) {
        const projectObject = {
          name: this.titulo.val,
          problem: this.descricao.val,
          expectedresult: this.resultadoEsperado.val,
          status: 'Em alocacao',
          subjectid: 1,
          userid: 1,
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
          projectService.addFile(file).then((resp) => {
            this.isLoading = false;
            console.log(resp);
          }).catch(() => {
            this.isLoading = false;
            projectService.deleteProject(response.data.data.response);
            alert('erro no cadastro de arquivo');
          });
        }).catch((response) => {
          this.isLoading = false;
          console.log(response);
          alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
        });
      }
    },
    updateFile() {
      // eslint-disable-next-line no-restricted-globals
      console.log(event.target.files[0]);
      // eslint-disable-next-line no-restricted-globals
      if (!event.target.files[0]) {
        this.file.isValid = false;
      } else {
        // eslint-disable-next-line prefer-destructuring,no-restricted-globals
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
        reader.onloadend = function (evt) {
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
    downloadFile() {
      axios.get(`http://localhost:3000/projeto/visualizar-arquivo/${13}`).then((response) => {
        const byteArray = new Uint8Array(response.data[0].bytecontent.data);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = response.data[0].filename;
        link.click();
      });
    },
    validateFormData() {
      this.formIsValid = true;
      this.titulo.isValid = !!this.titulo.val;
      this.descricao.isValid = !!this.descricao.val;
      this.resultadoEsperado.isValid = !!this.resultadoEsperado.val;
      this.file.isValid = !!this.file.val;
      if (!this.titulo.isValid
                || !this.descricao.isValid
                || !this.resultadoEsperado.isValid
                || !this.file.isValid) {
        this.formIsValid = false;
      }
      return this.formIsValid;
    },
    validateFormInput(input) {
      this[input].isValid = !!this[input].val;
    },
  },
};
