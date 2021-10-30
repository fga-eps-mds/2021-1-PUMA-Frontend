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
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),
  },
  {
    path: '/projeto/cadastro',
    name: 'Cadastro de Projeto',
    component: () => import('../views/cadastro-projeto/cadastro-projeto.vue'),
  },
  {
    path: '/evaluate/:subjectId',
    name: 'Evaluate',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/Evaluate/Evaluate.vue'),
  },
  {
    path: '/approval/:projId',
    name: 'Approval',
    props: true,
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/Approval/Approval.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
