<template>
  <div class="row">
    <div class="col-lg-4 col-lg-offset-4">
      <h2 class="mb-10">{{ operacao === 'visualizar' ? 'Visualização de Projeto' : 'Cadastro de Projeto'  }}</h2>
      <div class="form-group mt-8">
        <input :style="{borderColor: !titulo.isValid ? 'red' : ''}" type="text" v-model.trim="titulo.val" class="form-control" id="titulo" placeholder="Nome da proposta de projeto" @blur="validateFormInput('titulo')" @input="validateFormInput('titulo')">
        <p style="float: left" v-if="!titulo.isValid" :style="{color: !titulo.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
      <div class="form-group">
        <textarea :style="{borderColor: !descricao.isValid ? 'red' : ''}" v-model.trim="descricao.val" class="form-control" id="descricao" placeholder="Descreva sua proposta" rows="7" maxlength="10000" @blur="validateFormInput('descricao')"  @input="validateFormInput('descricao')"></textarea>
        <p style="float: left" v-if="!descricao.isValid" :style="{color: !descricao.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
      <div class="form-group">
        <textarea :style="{borderColor: !resultadoEsperado.isValid ? 'red' : ''}" v-model.trim="resultadoEsperado.val" class="form-control" id="descricao" placeholder="Descreva o resultado esperado" rows="5" @blur="validateFormInput('resultadoEsperado')" @input="validateFormInput('resultadoEsperado')"></textarea>
        <p style="float: left" v-if="!resultadoEsperado.isValid" :style="{color: !resultadoEsperado.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
      <div align="center" class="form-group">
        <form :style="{borderColor: !file.isValid ? 'red' : ''}" action="http://localhost:3000/upload" enctype="multipart/form-data" method="post">
          <input  @change="updateFile" name="pic" id="file" type="file" placeholder="assa">
          <label for="file" class="mb-3" :style="{color: !file.isValid ? 'red' : ''}" v-if="!file.isValid">Preenchimento obrigatório</label>
          <!--          <p v-if="!file.isValid">Arraste um arquivo de imagem que represente sua proposta de projeto ou selecione-o</p>-->
        </form>
      </div>
      <div class="form-group" v-if="operacao !== 'visualizar'">
        <button type="button" class="btn btn-warning" @click="submitForm">Submeter</button>
      </div>
<!--      <button class="btn" @click="downloadFile"><i class="fa fa-download"></i> Download</button>-->
    </div>
  </div>
</template>
<script>
import axios from '../main'
export default {
  name : 'ProjectRegister',
  data () {
    return {
      titulo: {val: '', isValid: true},
      descricao: {val: '', isValid: true},
      resultadoEsperado: {val: '', isValid: true},
      operacao: {val: '', isValid: true},
      formIsValid: '',
      file: {val: '', isValid: true}
    }
  },
  beforeCreate() {
    if (this.$router.currentRoute.params.idProjeto) {
      const idProjeto = this.$router.currentRoute.params.idProjeto;
      axios.get('http://localhost:3000/projeto/visualizar/'+ idProjeto).then((response) => {
        this.operacao = 'visualizar';
        this.descricao = response.data[0].descricao;
        console.log(response)
      });
    }
  },
  methods:{
    submitForm() {
      if(this.validateFormData()) {
        const projectObject = {
          name: this.titulo.val,
          problem: this.descricao.val,
          expectedresult: this.resultadoEsperado.val,
          knowledgearea: 'Engenharia de Produção',
          status: 'Em alocacao',
          userid: 1,
        }
        axios.post('http://localhost:3000/projeto/cadastro',projectObject).then((response) => {
          this.submitFile(response.data.result.rows[0].projectid)
        });
      }
    },
    updateFile() {
      if(!event.target.files[0]) {
        this.file.isValid = false;
      } else {
        this.file.val = event.target.files[0];
        this.file.isValid = true;
      }
    },
    submitFile(projectid) {
      const formData = new FormData();
      formData.append('file', this.file.val);
      formData.append('projectid', projectid)
      try {
        axios.post('http://localhost:3000/upload', formData).then((response) => {
          console.log(response);
        });
      } catch(err) {
        console.log(err);
      }
    },
    downloadFile() {
      axios.get('http://localhost:3000/projeto/visualizar-arquivo/' + 13).then((response) => {
        var byteArray = new Uint8Array(response.data[0].bytecontent.data);
        var blob = new Blob([byteArray], { type: 'application/octet-stream' });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = response.data[0].filename;
        link.click();
      });
    },
    validateFormData() {
        this.formIsValid = true;
        this.titulo.isValid = !this.titulo.val ? false : true;
        this.descricao.isValid =  !this.descricao.val ? false : true;
        this.resultadoEsperado.isValid =  !this.resultadoEsperado.val ? false : true;
        this.file.isValid = !this.file.val ? false : true;
        if(!this.titulo.isValid || !this.descricao.isValid || !this.resultadoEsperado.isValid || !this.file.isValid) {
          this.formIsValid = false
        }
        return this.formIsValid;
    },
    validateFormInput(input) {
      this[input].isValid = !this[input].val ? false : true;
    }
  }
}
</script>

<style>
h2 {
  margin-bottom: 20px;
}
form {
  margin-bottom: 25px;
  width: 500px;
  height: 200px;
  border: 5px dashed darkblue;
}
/*form p{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  text-align: center;*/
/*  line-height: 170px;*/
/*  color: red;*/
/*  font-family: Arial;*/
/*}*/
form input{

  width: 100%;
  height: 100%;
  opacity: 0;
}

</style>