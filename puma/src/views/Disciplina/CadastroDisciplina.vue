<template>
  <div>
    <b-form class="col-md-3">
      <b-form-group>
        <b-form-input
          placeholder="Qual é o nome da disciplina?"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
            placeholder="Qual é a ementa da disciplina?"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <button @click="olaMundo()" class="btn btn-primary ">
      Clique
    </button>
  </div>
</template>
<script>
export default {
  beforeCreate() {},
  methods: {
    olaMundo() {
      console.log('ola mundo');
    },
  },
  data() {
    return {};
  },
};
</script>
<style></style>
