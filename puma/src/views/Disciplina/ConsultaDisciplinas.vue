<template>
  <div  class="row" >
    <div class="col-md-8 col-lg-offset-2">
      <div class="table-responsive card">
        <table class="table table-striped table-bordered">
          <caption>Consulta de Disciplinas</caption>
          <thead class="thead-dark">
          <tr>
            <th class="font-weight-bold text-center w-10pc" scope="col">Nro</th>
            <th class="font-weight-bold text-center w-10pc" scope="col">Nome</th>
            <th class="font-weight-bold text-center w-10pc" scope="col">Prévia da ementa</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="disciplina in subjects.val" :key="disciplina.subjectid">
            <td class="valign-middle text-center" > {{ disciplina.subjectid }}</td>
            <td class="valign-middle text-center"> {{ disciplina.name }}</td>
            <td class="valign-middle text-center" > {{ disciplina.coursesyllabus }}</td>
            <td class="valign-middle text-center">
              <a :href="`disciplina/alteracao/` + disciplina.subjectid">
              <button class="btn input-group-append">
                Alterar
              </button>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import SubjectService from '../../services/subjectService';

const subjectService = new SubjectService();

export default {
  created() {
    subjectService.getSubjects().then((response) => {
      response.data.data.response.forEach((subject) => {
        // eslint-disable-next-line max-len
        this.subjects.val.push({ name: subject.name, coursesyllabus: subject.coursesyllabus, subjectid: subject.subjectid });
      });
    });
  },
  methods: {},
  data() {
    return {
      subjects: { val: [], isValid: true },
    };
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
body {
  font-size: 14px;
}

</style>
