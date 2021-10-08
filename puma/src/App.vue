<template>
  <div id="app">
    <div id="nav">
      <Navbar />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '../src/components/Navbar';

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
