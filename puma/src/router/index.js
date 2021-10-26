import Vue from 'vue';
import VueRouter from 'vue-router';
// import CadastroDisciplina from '../views/Disciplina/CadastroDisciplina.vue';
// import ConsultaDisciplina from '../views/Disciplina/ConsultaDisciplina.vue';
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
    path: '/disciplina',
    name: 'Consulta de Disciplinas',
    component: () => import('../views/Subject/ConsultaDisciplinas.vue'),
  },
  {
    path: '/disciplina/:cadastro',
    name: 'Cadastro de Disciplina',
    props: true,
    component: () => import('../views/Subject/SubjectRegister/SubjectRegister.vue'),
  },
  {
    path: '/disciplina/:alteracao/:idDisciplina',
    name: 'Alteração de Disciplina',
    props: true,
    component: () => import('../views/Subject/SubjectRegister/SubjectRegister.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
