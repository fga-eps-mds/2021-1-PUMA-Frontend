<template>
  <div class="row" >
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
                <button class="btn input-group-append" @click="consultarProjeto(projeto.projectid)"> Consultar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <b-button id="show-btn" @click="showModal">Open Modal</b-button>
      <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button>
      <b-modal ref="my-modal" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <h3>Hello From My Modal!</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
        <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
      </b-modal>
    </div>
    <div>
      <b-button @click="abrirModal">Abrir Modal</b-button>
      <b-button @click="fecharModal">Fechar Modal</b-button>
      <b-modal ref="meu-modal"></b-modal>
    </div>
  </div>
</template>

<script>
  import axios from '../main'

  export default {
    data () {
      return{
        projetos: []
      }
    },
    beforeCreate() {
      axios.get('http://localhost:3000/projeto/consulta').then((response) => {
          response.data.forEach((projeto) => {
            this.projetos.push(projeto);
          });
        });
    },
    methods: {
      consultarProjeto(idProjeto) {
        console.log(idProjeto);
        // this.$router.push('/projeto/visualizar/' + idProjeto);
      },
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        this.$refs['my-modal'].toggle('#toggle-btn')
      },
      abrirModal() {
        this.$refs['meu-modal'].show()
      },
      fecharModal() {
        this.$refs['meu-modal'].hide()
      },
    }
  }
</script>

<style></style>