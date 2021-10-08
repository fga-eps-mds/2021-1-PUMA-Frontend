<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/projeto/cadastro">Cadastro e projeto</router-link> |
      <router-link to="/projeto/consulta">Consulta de projetos</router-link>
    </div>
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #15355e;
}
</style>
