<template>
  <div class="col-md-4 col-lg-offset-4">
    <div class="form-group">
      <h2 class="mb-10">{{operacao==='cadastro'?
          'Cadastrar Disciplina':'Alterar Disciplina'}}</h2>
      <div>
        <input :style="{borderColor: !nomeDisciplina.isValid ? 'red' : ''}" type="text"
               v-model.trim="nomeDisciplina.val" class="form-control"
               id="nomeDisciplina" placeholder="Qual é nome da Disciplina?"
               @blur="validateFormInput('nomeDisciplina')"
               @input="validateFormInput('nomeDisciplina')"
               :disabled = isLoading>
        <p style="float: left" v-if="!nomeDisciplina.isValid"
           :style="{color: !nomeDisciplina.val ? 'red' : ''}">Preenchimento obrigatório</p>
      </div>
    </div>

    <div class="form-group">
      <div class="">
          <textarea
              :style="{borderColor: !ementa.isValid ? 'red' : ''}"
              v-model.trim="ementa.val" class="form-control" id="ementa"
              placeholder="Qual é a ementa da disciplina?" rows="7" maxlength="10000"
              @blur="validateFormInput('ementa')" @input="validateFormInput('ementa')"
              :disabled = isLoading>
          </textarea>
        <p style="float: left" v-if="!ementa.isValid"
           :style="{color: !ementa.val ? 'red' : ''}">
          Preenchimento obrigatório
        </p>
      </div>
    </div>

    <div class="form-group">
      <select name="subareas" id="subareas" multiple="true" v-model="subareasSelecionadas.val">
        <option v-for="subarea in subareas"
                :key="subarea.subareaid"
                :value="subarea"
                selected="true"
                >{{ subarea.description }}</option>
      </select>

    </div>

    <div class="form-group">
      <div>
        <button @click="submitForm()"
                class="btn btn-warnig">
          {{operacao==='cadastro'?'Cadastrar':'Alterar'}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import SubjectService from '../../services/subjectService';
import SubareaService from '../../services/subareaService';

const subjectService = new SubjectService();
const subareaService = new SubareaService();

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
    subareaService.getSubareas().then((response) => {
      response.data.response.forEach((subarea) => {
        this.subareas.push(subarea);
      });
    });
    if (this.operacao === 'alteracao') {
      subjectService.getSubject(this.subjectid).then((response) => {
        this.ementa.val = response.data.data.response[0].coursesyllabus.trim();
        this.nomeDisciplina.val = response.data.data.response[0].name.trim();
        response.data.data.response.forEach((subject) => {
          // eslint-disable-next-line max-len
          this.subareasSelecionadas.val.push({ description: subject.description, subareaid: subject.subareaid });
        });
      });
    }
  },
  methods: {
    validateFormInput(input) {
      this[input].isValid = this[input].val;
    },
    validateFormData() {
      this.formIsValid = true;
      this.nomeDisciplina.isValid = this.nomeDisciplina.val;
      this.ementa.isValid = this.ementa.val;
      if (!this.ementa.isValid || !this.nomeDisciplina.isValid) {
        this.formIsValid = false;
      }
      return this.formIsValid;
    },
    submitForm() {
      this.subareasSelecionadas.val.forEach((sub) => {
        this.subareas.forEach((subarea) => {
          if (subarea.description === sub.description) {
            this.subareasObject.push({ description: sub.description, subareaid: sub.subareaid });
          }
        });
      });
      const aux = [];
      this.subareasObject.forEach((subarea) => {
        aux.push({ description: subarea.description, subareaid: subarea.subareaid });
      });
      if (this.validateFormData()) {
        const subjectObject = {
          name: this.nomeDisciplina.val,
          coursesyllabus: this.ementa.val,
          subareas: aux,
          operacao: this.operacao,
          subjectid: this.subjectid,
        };
        console.log(subjectObject);
        subjectService.addSubject(subjectObject);
      }
    },
  },
  data() {
    return {
      nomeDisciplina: { val: '', isValid: true },
      ementa: { val: '', isValid: true },
      operacao: '',
      isLoading: false,
      subjectid: null,
      subareas: [],
      subareasSelecionadas: { val: [], isValid: true },
      subareasObject: [],
      formIsValid: '',
    };
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
  margin-left: 3%;
}
</style>
