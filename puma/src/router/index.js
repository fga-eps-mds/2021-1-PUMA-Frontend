import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/projeto/cadastro',
    name: 'Cadastro de Projeto',
    component: () => import('../views/cadastro-projeto.vue'),
  },
  {
    path: '/projeto/consulta',
    name: 'Consulta de Projetos',
    component: () => import('../views/consulta-projetos.vue'),
  },
  {
    path: '/projeto/visualizar/:idProjeto',
    name: 'Visualizar Projeto',
    component: () => import('../views/cadastro-projeto.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),

  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
