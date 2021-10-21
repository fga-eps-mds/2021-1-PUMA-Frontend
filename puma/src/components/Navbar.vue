<template>
  <div id="nav">
    <a href="/">Home</a> |
    <a href="/about">About</a> |
    <a href="/register">Register</a> |
    <a href="disciplina/cadastro"> Cadastro de Disciplina</a> |
    <a href="/disciplina"> Consulta de Disciplinas</a>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scope>
#nav {
  padding: 30px;
  background-color: #15355e;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
