<template>
  <div  class="row" >
    <div class="col-md-8 col-lg-offset-2">
      <div class="table-responsive card">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th class="font-weight-bold text-center w-10pc" scope="col">Nro proposta</th>
              <th class="font-weight-bold text-center w-10pc" scope="col">Nome Proposta</th>
              <th class="font-weight-bold text-center w-10pc" scope="col">Status</th>
              <th class="font-weight-bold text-center w-10pc" scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="projeto in projetos" :key="projeto.projectid">
              <td class="valign-middle text-center" > {{ projeto.projectid }}</td>
              <td class="valign-middle text-center"> {{ projeto.name }}</td>
              <td class="valign-middle text-center" > {{ projeto.status }}</td>
              <td class="valign-middle text-center">
<!--                  <button class="btn input-group-append"> Consultar</button>-->
                <button class="btn input-group-append" @click="consultarProjeto(projeto)">
                  Consultar
                </button>
              </td>
              <modal-detalhamento-projeto
                  v-if="isModalVisible"
                  @close='modifyModalState()' ref="modal"
              :name=currentModalProject.projeto.name
              :status="currentModalProject.projeto.status"
              :projectid="currentModalProject.projeto.projectid"
              :description="currentModalProject.projeto.problem"
              :file="currentModalProject.file"
              >
              </modal-detalhamento-projeto>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../main';

export default {
  data() {
    return {
      projetos: [],
      isModalVisible: false,
      currentModalProject: '',
    };
  },
  beforeCreate() {
    axios.get('http://localhost:3000/projeto/consulta').then((response) => {
      response.data.forEach((projeto) => {
        this.projetos.push(projeto);
      });
    });
  },
  methods: {
    consultarProjeto(projeto) {
      axios.get(`http://localhost:3000/projeto/visualizar-arquivo-projeto/${projeto.projectid}`).then((response) => {
        this.currentModalProject = {};
        // eslint-disable-next-line max-len
        this.currentModalProject.file = response.data.length ? { filename: response.data[0].filename, bytecontent: response.data[0].bytecontent.data } : {};
        this.currentModalProject.projeto = projeto;
        this.isModalVisible = true;
      });
    },
    modifyModalState() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style></style>
