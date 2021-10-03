<template>
  <div class="row">
    <div class="col-lg-4 col-lg-offset-4">
      <h2 class="mb-10">{{ operacao === 'visualizar' ? 'Visualização de Projeto' : 'Cadastro de Projeto'  }}</h2>
      <div class="form-group mt-8">
        <input type="text" v-model.trim="titulo" class="form-control" id="titulo" placeholder="Digite um título para a proposta" @blur="validateFormData">
      </div>
      <div class="form-group">
        <textarea v-model.trim="descricao" class="form-control" id="descricao" placeholder="Descreva sua proposta" rows="7"></textarea>
      </div>
      <div class="form-group">
        <textarea v-model.trim="resultadoEsperado" class="form-control" id="descricao" placeholder="Descreva o resultado esperado" rows="5"></textarea>
      </div>
      <div  align="center">
        <form action="http://localhost:3000/upload" enctype="multipart/form-data" method="post">
          <input @change="updateFile" name="pic" type="file">
        </form>
      </div>
      <div class="form-group" v-if="operacao !== 'visualizar'">
        <button type="button" class="btn btn-primary" @click="submitForm">Submeter</button>
      </div>
      <div class="form-group" v-if="operacao !== 'visualizar'">
        <button type="button" class="btn btn-primary" @click="submitFile">Submeter Arquivo</button>
      </div>
      <button class="btn" @click="downloadFile"><i class="fa fa-download"></i> Download</button>

    </div>
  </div>
</template>
<script>
import axios from '../main'
export default {
  name : 'ProjectRegister',
  data () {
    return {
      titulo: '',
      descricao: '',
      resultadoEsperado: '',
      operacao: 'cadastrar',
      file: ''
    }
  },
  beforeCreate() {
    if (this.$router.currentRoute.params.idProjeto) {
      const idProjeto = this.$router.currentRoute.params.idProjeto;
      axios.get('http://localhost:3000/projeto/visualizar/'+ idProjeto).then((response) => {
        this.operacao = 'visualizar';
        this.descricao = response.data[0].descricao;
        console.log(response.data);
      });
    }
  },
  methods:{
    submitForm() {
      if(this.validateFormData()) {
        const formDataFile = new FormData();
        formDataFile.append('file', this.file);
        const projectObject = {
          name: this.titulo,
          problem: this.descricao,
          expectedresult: this.resultadoEsperado,
          knowledgearea: 'Engenharia de Produção',
          status: 'Em alocacao',
          userid: 1,
          file: formDataFile
        }
        console.log(projectObject);
        axios.post('http://localhost:3000/projeto/cadastro',projectObject);
      }
    },
    updateFile() {
      this.file = event.target.files[0]
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        axios.post('http://localhost:3000/upload', formData).then((response) => {
          console.log(response);
        });
      } catch(err) {
        console.log(err);
      }
    },
    downloadFile() {
      axios.get('http://localhost:3000/projeto/visualizar-arquivo/' + 7).then((response) => {
        var byteArray = new Uint8Array(response.data[0].bytecontent.data);
        var blob = new Blob([byteArray], { type: 'application/octet-stream' });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = response.data[0].filename;
        link.click();
      });
    },
    validateFormData() {
        return true;
    }
  }
}
</script>

<style>
form {
  margin-bottom: 25px;
  width: 500px;
  height: 200px;
  border: 4px dashed blue;
}
form p{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 170px;
  color: red;
  font-family: Arial;
}
form input{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
}
form button{
  margin: 0;
  color: #fff;
  background: #16a085;
  border: none;
  width: 508px;
  height: 35px;
  /*margin-top: -20px;*/
  /*margin-left: -4px;*/
  border-radius: 4px;
  border-bottom: 4px solid #117A60;
  transition: all .2s ease;
  outline: none;
}
form button:hover{
  background: #149174;
  color: #0C5645;
}
form button:active{
  border:0;
}




</style>