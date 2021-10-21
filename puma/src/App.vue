<template>
  <div id="app">
  <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700,900" rel="stylesheet">
    <Navbar />
    <router-view />
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
