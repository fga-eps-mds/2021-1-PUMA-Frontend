<template>
  <div class="home">
    <img alt="Puma logo" src="../assets/puma.png" />
    <router-link :to="{ path: '/evalueate/1'}" replace>PSP1</router-link>
    <router-link :to="{ path: '/evalueate/2'}" replace>PSP2</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
