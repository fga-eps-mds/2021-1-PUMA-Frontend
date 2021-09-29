<template src="cadastro-projeto.html"></template>
<style src="cadastro-projeto.css"></style>
<script>
import axios from '../../main'
export default {
  name : 'ProjectRegister',
  data () {
    return{
      descricao: '',
      titulo: ''
    }
  },
  methods:{
    submitForm(){
      const projectObject = {
        descricao: this.descricao,
        concluido: false,
        aprovado: true,
        agente_externo: 1,
        disciplina_aloc: 1
      }
      // const formProject = JSON.stringify(projectObject);
      console.log(projectObject);
      axios.post("http://localhost:3000/projeto/cadastro",projectObject).then(() =>{
        this.$router.push('/') //Direcionar para a página de Login
        alert('Cadastro realizado com Sucesso!')
      }).catch(() =>{//Tratamento para aceitar apenas com todos os campos preenchidos
        alert('Preencha todos os campos! ')
      })
    }
  }
}
</script>