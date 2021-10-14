<template>
  <div class="col-md-4 col-lg-offset-4">
    <div class="form-group">
      <h2 class="mb-10">{{operacao === 'visualizar'?'Visualização de Projeto':'Novo Projeto'}}</h2>
      <div class="">
        <input :style="{borderColor: !titulo.isValid ? 'red' : ''}" type="text"
               v-model.trim="titulo.val" class="form-control"
               id="titulo" placeholder="Qual é o título da proposta de projeto?"
               @blur="validateFormInput('titulo')" @input="validateFormInput('titulo')"
               :disabled = isLoading>
        <p style="float: left" v-if="!titulo.isValid"
           :style="{color: !titulo.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
    </div>

     <div class="form-group">
        <div class="">
          <textarea
              :style="{borderColor: !descricao.isValid ? 'red' : ''}"
              v-model.trim="descricao.val" class="form-control" id="descricao"
              placeholder="Qual a proposta do projeto?" rows="7" maxlength="10000"
              @blur="validateFormInput('descricao')" @input="validateFormInput('descricao')"
              :disabled = isLoading>
          </textarea>
          <p style="float: left" v-if="!descricao.isValid"
             :style="{color: !descricao.val ? 'red' : ''}">
            Preenchimento obrigatório
          </p>
        </div>
     </div>

    <div class="form-group" style="display: inline">
      <div class="">
        <textarea :style="{borderColor: !resultadoEsperado.isValid ? 'red' : ''}"
                  v-model.trim="resultadoEsperado.val" class="form-control"
                  id="descricao" placeholder="Qual resultado espera ter?" rows="5"
                  @blur="validateFormInput('resultadoEsperado')"
                  @input="validateFormInput('resultadoEsperado')"
                  :disabled = isLoading>
        </textarea>
        <p style="position: relative; left: -106px;margin-bottom: 0;"
           v-if="!resultadoEsperado.isValid"
           :style="{color: !resultadoEsperado.val ? 'red' : ''}">
          Preenchimento obrigatório
        </p>
      </div>
    </div>

    <div v-if="areasConhecimento.lenght">
      <h3>
        Quais áreas de conhecimento o projeto pertence?
      </h3>
    </div>
    <div class="form-group"
         v-for="areaConhecimento in areasConhecimento"
         :key="areaConhecimento.id"
         id="checklistArea"
    >
      <input :value="areaConhecimento.knowledgearea"
             type="checkbox"
             v-model="areasConhecimentoSelecionadas.val"
             @change="validateFormInput('areaConhecimento')">
      <label :for="areaConhecimento.id"> {{areaConhecimento.knowledgearea}}</label>
    </div>

    <div>
      <label
          id="negativeKnAreaForm"
          style="margin-bottom: 10px;margin-bottom: 7px;position: relative;top: -11px;left: -33px;"
          v-if="!areasConhecimentoSelecionadas.isValid"
          :style="{color: !areasConhecimentoSelecionadas.isValid ? 'red' : ''}"
          >
        Selecione ao menos uma área de conhecimento
      </label>
    </div>

    <div style="float: left" class="form-group" :style="{borderColor: !file.isValid ? 'red' : ''}">
      <input
          :disabled = isLoading
          @change="updateFile($event)"
          name="pic" id="file"
          type="file"
      >
    </div>

    <label for="file" class="mb-3"
           :style="{color: !file.isValid ? 'red' : ''}"
           v-if="!file.isValid"
           style="position: relative;top: -16px;left: -100px;">
      Preenchimento obrigatório
    </label>
   <!-- <div align="center" class="form-group">
     <form :style="{borderColor: !file.isValid ? 'red' : ''}" action="http://localhost:3000/upload" enctype="multipart/form-data" method="post">
       <input :disabled = isLoading
              @change="updateFile($event)"
              name="pic" id="file"
              type="file"
              placeholder="assa">
       <label for="file" class="mb-3"
              :style="{color: !file.isValid ? 'red' : ''}"
              v-if="!file.isValid">
         Preenchimento obrigatório
       </label>
       <p v-if="!this.file.val">
         Arraste um arquivo de imagem que represente sua proposta de projeto ou selecione-o
       </p>
       <p v-else-if="this.file.val">
         {{ file.val.name }}
       </p>
       <p v-else style="color: darkblue">
         Arraste um arquivo de imagem que represente sua proposta de projeto ou selecione-o
       </p>
     </form>
   </div> -->
      <div class="form-row" v-if="operacao !== 'visualizar'">
        <button v-if="!isLoading"
                type="button"
                class="btn btn-warning"
                @click="submitForm">Submeter</button>
      </div>
<!--<button class="btn" @click="downloadFile"><i class="fa fa-download"></i> Download</button>-->
    </div>
</template>
<script>
import axios from '../main';
import ProjectService from '../services/projectService';

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
      areasConhecimentoSelecionadas: { val: [], isValid: true },
      areasConhecimentoObject: [],
    };
  },
  beforeCreate() {
    projectService.getKnowledgeAreas().then((response) => {
      response.data.data.response.forEach((areaConhecimento) => {
        this.areasConhecimento.push(areaConhecimento);
      });
    });
  },
  methods: {
    submitForm() {
      if (this.validateFormData()) {
        this.areasConhecimentoObject = [];
        this.areasConhecimentoSelecionadas.val.forEach((areaConhecimento) => {
          this.areasConhecimento.forEach((area) => {
            if (area.knowledgearea === areaConhecimento) {
              // eslint-disable-next-line max-len
              this.areasConhecimentoObject.push({ knowledgearea: area.knowledgearea, knoledgeareaid: area.knoledgeareaid });
            }
          });
        });
        const aux = [];
        this.areasConhecimentoObject.forEach((area) => {
          aux.push({ knowledgearea: area.knowledgearea, knoledgeareaid: area.knoledgeareaid });
        });
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
          console.log(file);
          projectService.addFile(file).then((resp) => {
            this.isLoading = false;
            console.log(resp);
          }).catch(() => {
            this.isLoading = false;
            alert('erro no cadastro de arquivo');
          });
        }).catch((response) => {
          this.isLoading = false;
          console.log(response);
          alert('Uma falha ocorreu ao efetuar o cadastro. Tente novamente.');
        });
      }
    },
    updateFile(event) {
      console.log(event.target.files[0]);
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
      this.titulo.isValid = this.titulo.val;
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
</script>

<style>
h2 {
  margin-top: 50px;
  margin-bottom: 20px;
}
h3{
  font-size: 18px;
  margin: 15px 0 3px 0;
  position: relative;
  display: inline-block;
  font-weight: bold;
}
html{
  margin-bottom: 27px;
}
input[type="checkbox"] {
    margin: 0 4px 0 0;
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
    margin-bottom: 7px;
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
  font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif;
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
#checklistArea {
    margin: 10px 0 15px 0;
    display: -webkit-inline-box;
    position: relative;
    padding-left: 8px;
    left: -43px;
}
.btn{
  color: black;
}
</style>
