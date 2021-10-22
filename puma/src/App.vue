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

input,
select {
  border-radius: 7px;
  font-size: 1.1em;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 70px;
  margin-right: 70px;
  padding: 15px;
}

.submit-btn {
  align-items: center;
  background-color: #f7db36;
  color: #222;
  border: 2px solid #f7db36;
  padding: 10px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: 0.5s;
  width: 10em;
}

.column {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}

.flex1 {
    flex: 1;
}
</style>
