<template>
  <div class="row" >
    <div class="col-md-8 col-lg-offset-2">
      <div class="table-responsive card">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th class="font-weight-bold text-center w-10pc" scope="col">Nro proposta</th>
              <th class="font-weight-bold text-center w-10pc" scope="col">Status</th>
              <th class="font-weight-bold text-center w-10pc" scope="col">Agente Externo</th>
              <th class="font-weight-bold text-center w-10pc" scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="projeto in projetos" :key="projeto.id">
              <td class="valign-middle text-center" > {{ projeto.id }}</td>
              <td class="valign-middle text-center" > {{ projeto.concluido ? 'CONCLUÍDO' : 'APROVADO' }}</td>
              <td class="valign-middle text-center"> {{ projeto.agente_externo }}</td>
              <td class="valign-middle text-center">
<!--                  <button class="btn input-group-append"> Consultar</button>-->
                  <button class="btn input-group-append" @click="consultarProjeto(projeto.id)"> Consultar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
        this.$router.push('/projeto/visualizar/' + idProjeto);
      }
    }
  }
</script>

<style>

</style>