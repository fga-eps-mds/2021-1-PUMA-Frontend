import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/projeto/cadastro',
    name: 'Cadastro de Projeto',
    component: () => import('../views/cadastro-projeto')
  },
  {
    path: '/projeto/consulta',
    name: 'Consulta de Projetos',
    component: () => import('../views/consulta-projetos')
  },
  {
    path: '/projeto/visualizar/:idProjeto',
    name: 'Visualizar Projeto',
    component: () => import('../views/cadastro-projeto')
  }
]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/Register/Register.vue'),

  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
