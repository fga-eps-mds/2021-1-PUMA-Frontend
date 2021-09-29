<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
<<<<<<< HEAD
      <router-link to="/projeto/cadastro">Cadastro de projeto</router-link> |
      <router-link to="/projeto/consulta">Consulta de projetos</router-link>

=======
      <router-link to="/proposta/cadastro">Cadastrar Proposta</router-link>
>>>>>>> def2a57594c41f8add06f1ef19a15a5a64fb5b52
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
