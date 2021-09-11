<template>
  <div class="container-fluid h-100 text-dark cadastro">
    <div class="row justify-content-center align-items-center">
      <h3 class="mb-4">Cadastrar Proposta</h3>
    </div>
    <div class="row justify-content-center">
      <div class="col col-lg-4">
        <form @submit.prevent>
          <div class="form-group">
            <label class="justify-content-lg-start" for="titulo" type="text">Nome</label>
            <input type="text" class="form-control" id="titulo" v-model="nome" placeholder="Nome"/>
            <div class="valid-feedback">
              Nome invalido!
            </div>
          </div>
          <div class="form-group">
            <label class="justify-content-lg-start" for="previsao">Previsão</label>
            <input type="text" class="form-control" id="previsao" v-model="previsao" placeholder="Previsao"/>
          </div>
          <div class="form-group">
            <label class="justify-content-lg-start">Detalhamento</label>
            <textarea class="form-control" id="detalhe" v-model="detalhamento" rows="5"></textarea>
          </div>
          <div class="form-group">
            <button class="col-3 btn btn-primary" @click="submitForm()">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      nome: '',
      previsao: '',
      detalhamento: '',
    }
  },
  methods : {
    submitForm() {
      console.log({nome: this.nome, detalhamento: this.detalhamento, previsao: this.previsao});
    },
  },
  name: 'CadastroProposta'
}
</script>
