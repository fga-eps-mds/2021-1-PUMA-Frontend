<template>
  <div class="col-md-4 col-lg-offset-4">
    <div class="form-group">
      <h2 class="mb-10">{{ operacao === 'visualizar' ? 'Visualização de Projeto' : 'Novo Projeto'  }}</h2>
      <div class="">
        <input :style="{borderColor: !titulo.isValid ? 'red' : ''}" type="text" v-model.trim="titulo.val" class="form-control" id="titulo" placeholder="Qual é o título da proposta de projeto?" @blur="validateFormInput('titulo')" @input="validateFormInput('titulo')">
        <p style="float: left" v-if="!titulo.isValid" :style="{color: !titulo.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
    </div>

     <div class="form-group">
        <div class="">
          <textarea :style="{borderColor: !descricao.isValid ? 'red' : ''}" v-model.trim="descricao.val" class="form-control" id="descricao" placeholder="Descreva sua proposta" rows="7" maxlength="10000" @blur="validateFormInput('descricao')"  @input="validateFormInput('descricao')"></textarea>
          <p style="float: left" v-if="!descricao.isValid" :style="{color: !descricao.val ? 'red' : ''}">Preenchimento obrigatório</p>
        </div>
     </div>

    <div class="form-group">
      <div class="">
        <textarea :style="{borderColor: !resultadoEsperado.isValid ? 'red' : ''}" v-model.trim="resultadoEsperado.val" class="form-control" id="descricao" placeholder="Descreva o resultado esperado" rows="5" @blur="validateFormInput('resultadoEsperado')" @input="validateFormInput('resultadoEsperado')"></textarea>
        <p style="float: left" v-if="!resultadoEsperado.isValid" :style="{color: !resultadoEsperado.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
    </div>


      <div class="form-group">
        <div id="checklist" class="form-check form-check-inline">
          <span class="form-check-input mr-2">Tipo de Submissão </span>
          <div id="checklist">
            <input @change="modifyAgentType($event)" class="form-check-input" type="radio" name="physicalAgent" id="physicalAgent" value="true" checked>
            <label class="form-check-label" for="physicalAgent">Pessoa Física</label>
          </div>
          <div id="checklist">
            <input  @change="modifyAgentType($event)" class="form-check-input ml-2" name="physicalAgent" type="radio" id="" value="false">
            <label class="form-check-label" for="physicalAgent">Pessoa Jurídica</label>
          </div>          
          
        </div>
      </div>

      <div class="form-group" v-if="isPhysicalAgent">
        <div class="">
          <label for="nome">CPF:</label>
          <input  mask="00000000000" placeholder="Digite seu CPF" :style="{borderColor: !cpf.isValid ? 'red' : ''}" v-model.trim="cpf.val" @blur="validateFormInput('cpf')" @input="validateFormInput('cpf')" class="form-control" type="text" id="nome" />
          <p style="float: left" v-if="!cpf.isValid" :style="{color: !cpf.val ? 'red' : ''}">Preenchimento obrigatório</p>
        </div>
      </div>

    <div class="form-group" v-if="!isPhysicalAgent">
      <div class="form-group">
        <label for="nome">CNPJ:</label>
        <input placeholder="Digite seu CNPJ" :style="{borderColor: !cnpj.isValid ? 'red' : ''}" v-model.trim="cnpj.val" @blur="validateFormInput('cnpj')" @input="validateFormInput('cnpj')" class="form-control" type="text"/>
        <p style="float: left" v-if="!cnpj.isValid" :style="{color: !cnpj.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>

      <div class="form-group">
        <label v-if="!nomeEmpresa.isValid" style="margin-top: 7px;left: -79px" for="nome">Nome da Empresa</label>
        <label v-else-if="!cnpj.isValid" style="margin-top: 7px;left: -79px" for="nome">Nome da Empresa</label>
        <label v-else for="nome">Nome da Empresa</label>
        <input  placeholder="Digite o nome da empresa" :style="{borderColor: !nomeEmpresa.isValid ? 'red' : ''}" v-model.trim="nomeEmpresa.val" @blur="validateFormInput('nomeEmpresa')" @input="validateFormInput('nomeEmpresa')" class="form-control" type="text" id="nomeEmpresa"/>
        <p style="float: left" v-if="!nomeEmpresa.isValid" :style="{color: !nomeEmpresa.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>

      <div class="form-group">
        <label v-if="!razaoSocial.isValid" style="margin-top: 7px;left: -79px" for="nome">Razão Social</label>
        <label v-else-if="!nomeEmpresa.isValid" style="margin-top: 7px;left: -79px" for="nome">Razão Social</label>
        <label v-else for="nome">Razão Social</label>
        <input  placeholder="Digite sua razão social" :style="{borderColor: !razaoSocial.isValid ? 'red' : ''}" v-model.trim="razaoSocial.val" @blur="validateFormInput('razaoSocial')" @input="validateFormInput('razaoSocial')" class="form-control" type="text" id="razaoSocial" />
        <p style="float: left" v-if="!razaoSocial.isValid" :style="{color: !razaoSocial.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>

      <div class="form-group">
        <label v-if="!cep.isValid" style="margin-top: 7px;left: -79px" for="nome">CEP</label>
        <label v-else-if="!razaoSocial.isValid" style="margin-top: 7px;left: -79px" for="nome">CEP</label>
        <label v-else for="nome">CEP</label>
        <input  placeholder="Digite seu CEP" :style="{borderColor: !cep.isValid ? 'red' : ''}" v-model.trim="cep.val" @blur="validateFormInput('cep')" @input="validateFormInput('cep')" class="form-control" type="text" id="cep" />
        <p style="float: left" v-if="!cep.isValid" :style="{color: !cep.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
    </div>

    <div align="center" class="form-group">
      <form :style="{borderColor: !file.isValid ? 'red' : ''}" action="http://localhost:3000/upload" enctype="multipart/form-data" method="post">
        <input  @change="updateFile" name="pic" id="file" type="file" placeholder="assa">
        <label for="file" class="mb-3" :style="{color: !file.isValid ? 'red' : ''}" v-if="!file.isValid">Preenchimento obrigatório</label>
        <p v-if="!file.isValid">Arraste um arquivo de imagem que represente sua proposta de projeto ou selecione-o</p>
        <p v-else style = "color: blue; top: -153px">Arraste um arquivo de imagem que represente sua proposta de projeto ou selecione-o</p>
      </form>
    </div>

      <div class="form-row" v-if="operacao !== 'visualizar'">
        <button type="button" class="btn btn-warning" @click="submitForm">Submeter</button>
      </div>
<!--      <button class="btn" @click="downloadFile"><i class="fa fa-download"></i> Download</button>-->

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
      file: {val: '', isValid: true},
      isPhysicalAgent: true,
      cpf: {val: '', isValid: true},
      cnpj: {val: '', isValid: true},
      nomeEmpresa: {val: '', isValid: true},
      razaoSocial: {val: '', isValid: true},
      cep: {val: '', isValid: true}
    }
  },
  beforeCreate() {
    if (this.$router.currentRoute.params.idProjeto) {
      const idProjeto = this.$router.currentRoute.params.idProjeto;
      axios.get('http://localhost:3000/projeto/visualizar/'+ idProjeto).then((response) => {
        this.operacao = 'visualizar';
        this.descricao = response.data[0].descricao;
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
          cpf: this.cpf.val,
          cnpj: this.cnpj.val,
          razaoSocial: this.razaoSocial.val,
          nomeEmpresa: this.nomeEmpresa.val,
          cep: this.cep.val,
          userid: 1,
        }
        axios.post('http://localhost:3000/projeto/cadastro',projectObject).then((response) => {
          this.submitFile(response.data.result.rows[0].projectid)
        });
      }
    },
    modifyAgentType($event) {
      if(!$event.path[0].id) {
        this.isPhysicalAgent = false;
        this.cpf.val = '';
        this.cpf.isValid = true;
      } else {
        this.cnpj.val = '';
        this.razaoSocial.val = '';
        this.nomeEmpresa.val = '';
        this.cep.val = ''
        this.cnpj.isValid = true;
        this.razaoSocial.isValid = true;
        this.nomeEmpresa.isValid = true
        this.cep.isValid = true;
        this.isPhysicalAgent = true;
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
        this.cpf.isValid = !this.cpf.val ? (this.isPhysicalAgent ? false : true) : true;
        this.cnpj.isValid = !this.cnpj.val ? (!this.isPhysicalAgent ? false : true) : true;
        this.nomeEmpresa.isValid = !this.nomeEmpresa.val ? (!this.isPhysicalAgent ? false : true) : true;
        this.razaoSocial.isValid = !this.razaoSocial.val ? (!this.isPhysicalAgent ? false : true) : true;
        this.cep.isValid = !this.cep.val ? (!this.isPhysicalAgent ? false : true) : true;
        this.titulo.isValid = !this.titulo.val ? false : true;
        this.descricao.isValid =  !this.descricao.val ? false : true;
        this.resultadoEsperado.isValid =  !this.resultadoEsperado.val ? false : true;
        this.file.isValid = !this.file.val ? false : true;
        if(!this.titulo.isValid || !this.descricao.isValid || !this.resultadoEsperado.isValid || !this.file.isValid || !this.cpf.isValid || !this.cnpj.isValid || !this.razaoSocial.isValid || !this.nomeEmpresa.isValid || !this.cep.isValid) {
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