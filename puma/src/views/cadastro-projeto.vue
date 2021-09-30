<template>
  <div class="row">
    <div class="col-lg-4 col-lg-offset-4">
      <h2 class="mb-10">{{ operacao === 'visualizar' ? 'Visualização de Projeto' : 'Cadastro de Projeto'  }}</h2>
      <div class="form-group mt-8">
        <input type="text" v-model.trim="titulo" class="form-control" id="titulo" placeholder="Digite um título para a proposta" @blur="validateFormData">
      </div>
      <div class="form-group">
        <textarea v-model.trim="descricao" class="form-control" id="descricao" placeholder="Descreva sua proposta" rows="3"></textarea>
      </div>
      <div class="form-group mb-3">
        <input type="file" id="file" ref="myFiles" class="custom-file-input mb-2" @change="previewFiles" multiple>
      </div>
      <div class="form-group" v-if="operacao !== 'visualizar'">
        <button type="button" class="btn btn-primary" @click="submitForm">Submeter</button>
      </div>
<!--      <div class="form-group">-->
<!--        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">-->
<!--        <button @click="cadastrarArquivo()">Submeter anexo</button>-->
<!--        <input type="file" @change="previewFiles" multiple>-->

<!--      </div>-->
    </div>

  </div>

</template>
<script>
import axios from '../main'
export default {
  name : 'ProjectRegister',
  data () {
    return{
      descricao: '',
      titulo: '',
      operacao: 'cadastrar',
      files: [],
      file: ''
    }
  },
  beforeCreate() {
    if (this.$router.currentRoute.params.idProjeto) {
      const idProjeto = this.$router.currentRoute.params.idProjeto;
      console.log('entrei');
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
        const projectObject = {
          descricao: this.descricao,
          concluido: false,
          aprovado: true,
          agente_externo: 1, // I'll keep static until the UserService implementation
          disciplina_aloc: 1
        }
        console.log(projectObject);
        axios.post("http://localhost:3000/projeto/cadastro",projectObject);
      }
    },
    cadastrarArquivo() {
      let formData = new FormData();
      formData.append('file', this.file);
      console.log(formData);
      // console.log(this.arquivo);
    },
    previewFiles() {
      this.files = this.$refs.myFiles.files
      console.log(this.files);
    },
    validateFormData() {
        return true;
    }
  }
}
</script>

<style>

</style>