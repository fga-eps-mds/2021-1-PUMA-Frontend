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
    path: '/disciplina/cadastro',
    name: 'Cadastro de Disciplina',
    component: () => import('../views/Disciplina/CadastroDisciplina.vue'),
  },
  {
    path: 'disciplina/alteraracao/:idDisciplina',
    name: 'Alteração de Disciplina',
    component: () => import('../views/Disciplina/CadastroDisciplina.vue'),
  },
  {
    path: 'disciplina/consulta/:idDisciplina',
    name: 'Consulta de Disciplina',
    component: () => import('../views/Disciplina/ConsultaDisciplina.vue'),
  },
  {
    path: '/disciplina',
    name: 'Disciplinas',
    component: () => import('../views/Disciplina/ConsultaDisciplinas.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
