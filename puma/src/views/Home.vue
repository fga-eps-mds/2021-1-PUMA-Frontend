<template>
  <div class="home">
    <img alt="Puma logo" src="../assets/puma.png" />
    <router-link :to="{ path: '/evaluate/1'}" replace>PSP1</router-link> |
    <router-link :to="{ path: '/evaluate/2'}" replace>PSP2</router-link> |
    <router-link :to="{ path: '/projeto/cadastro'}" replace>Nova proposta</router-link> |
    <router-link :to="{ path: '/myProposals'}" replace>Minhas Propostas</router-link>
  </div>
</template>

<script>
import UserService from '../services/userService';

const userService = new UserService();

export default {
  created() {
    if (userService.getUserType() === 'Agente Externo') {
      this.$router.push({ name: 'My Proposals' });
    }
  },
  name: 'Home',
};
</script>
