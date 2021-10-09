<template>
  <div class="col-md-4 col-lg-offset-4">
    <div class="form-group">
      <h2 class="mb-10">{{operacao === 'visualizar'?'Visualização de Projeto':'Novo Projeto'}}</h2>
      <div class="">
        <input :style="{borderColor: !titulo.isValid ? 'red' : ''}" type="text"
               v-model.trim="titulo.val" class="form-control"
               id="titulo" placeholder="Qual é o título da proposta de projeto?"
               @blur="validateFormInput('titulo')" @input="validateFormInput('titulo')">
        <p style="float: left" v-if="!titulo.isValid"
           :style="{color: !titulo.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
    </div>

     <div class="form-group">
        <div class="">
          <textarea
              :style="{borderColor: !descricao.isValid ? 'red' : ''}"
              v-model.trim="descricao.val" class="form-control" id="descricao"
              placeholder="Descreva sua proposta" rows="7" maxlength="10000"
              @blur="validateFormInput('descricao')" @input="validateFormInput('descricao')">
          </textarea>
          <p style="float: left" v-if="!descricao.isValid"
             :style="{color: !descricao.val ? 'red' : ''}">
            Preenchimento obrigatório
          </p>
        </div>
     </div>

    <div class="form-group">
      <div class="">
        <textarea :style="{borderColor: !resultadoEsperado.isValid ? 'red' : ''}"
                  v-model.trim="resultadoEsperado.val" class="form-control"
                  id="descricao" placeholder="Descreva o resultado esperado" rows="5"
                  @blur="validateFormInput('resultadoEsperado')"
                  @input="validateFormInput('resultadoEsperado')">
        </textarea>
        <p style="float: left"
           v-if="!resultadoEsperado.isValid"
           :style="{color: !resultadoEsperado.val ? 'red' : ''}">
          Preenchimento obrigatório
        </p>
      </div>
    </div>

    <div align="center" class="form-group">
      <form :style="{borderColor: !file.isValid ? 'red' : ''}" action="http://localhost:3000/upload" enctype="multipart/form-data" method="post">
        <input  @change="updateFile" name="pic" id="file" type="file" placeholder="assa">
        <label for="file" class="mb-3"
               :style="{color: !file.isValid ? 'red' : ''}"
               v-if="!file.isValid">
          Preenchimento obrigatório
        </label>
        <p v-if="!this.file.val ">
          Arraste um arquivo de imagem que represente sua proposta de projeto ou selecione-o
        </p>
        <p v-else>
          {{ file.val.name }}
        </p>
      </form>
    </div>

    <div>
    </div>

      <div class="form-row" v-if="operacao !== 'visualizar'">
        <button type="button" class="btn btn-warning" @click="submitForm">Submeter</button>
      </div>
<!--<button class="btn" @click="downloadFile"><i class="fa fa-download"></i> Download</button>-->

    </div>
</template>
<script>
import axios from '../main';

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
      areasConhecimento: [{ knoledgeareaid: 1, knowledgearea: 'math' }, { knoledgeareaid: 2, knowledgearea: 'biology' }],
    };
  },
  beforeCreate() {
    // axios.get('http://localhost:3000/areas-conhecimento').then((response) => {
    //   response.data.forEach((areaConhecimento) => {
    //     this.areasConhecimento.push(areaConhecimento);
    //   });
    // });
    // if (this.$router.currentRoute.params.idProjeto) {
    //   const { idProjeto } = this.$router.currentRoute.params;
    //   axios.get(`http://localhost:3000/projeto/visualizar/${idProjeto}`).then((response) => {
    //     this.operacao = 'visualizar';
    //     this.descricao = response.data[0].descricao;
    //   });
    // }
  },
  methods: {
    submitForm() {
      console.log(this.file);
      if (this.validateFormData()) {
        const projectObject = {
          name: this.titulo.val,
          problem: this.descricao.val,
          expectedresult: this.resultadoEsperado.val,
          knowledgearea: [],
          status: 'Em alocacao',
          subjectid: 1,
          userid: 1,
          file: '',
        };
        axios.post('http://localhost:3000/projeto/cadastro', projectObject).then((response) => {
          this.submitFile(response.data.result.rows[0].projectid);
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
    submitFile(projectid) {
      const formData = new FormData();
      formData.append('file', this.file.val);
      formData.append('projectid', projectid);
      try {
        axios.post('http://localhost:3000/upload', formData).then((response) => {
          console.log(response);
        });
      } catch (err) {
        console.log(err);
      }
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
</script>

<style>
h2 {
  margin-bottom: 20px;
}
html{
  margin-bottom: 27px;
}

div#checklist {
  display: inline-flex;
  padding-left: 13px;
}
label{
  position: relative;
}

input#file {
    position: relative;
    z-index: 5;
}
form {
  margin-bottom: 25px;
  margin-top: 32px;
  width: 409px;
  height: 200px;
  border: 5px dashed darkblue;
}
form p {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 39px;
  color: red;
  font-family: Arial;
  position: relative;
  top: -173px;
  font-size: 20px;
}
form input{
  width: 100%;
  height: 100%;
  opacity: 0;
}
form label {
    position: relative;
    top: 7px;
}

</style>
