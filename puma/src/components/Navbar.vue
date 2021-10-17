<template>
  <div id="nav">
    <a href="/">Home</a> |
    <a href="/about">About</a> |
    <a href="/register">Register</a> |
    <a class="router-link" href="/projeto/cadastro">Cadastro de projeto</a>
<!--    <router-link to="/projeto/cadastro"></router-link> |-->
<!--    <router-link to="/projeto/consulta">Consulta de projetos</router-link>-->
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scope>
#nav {
    padding-top: 19px;
    background-color: #15355e;
    height: 84px;
}

#nav a {
  font-weight: bold;
  color: white;
  margin: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
