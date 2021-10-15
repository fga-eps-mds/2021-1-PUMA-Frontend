<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/discipline">Disciplina</router-link>
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
