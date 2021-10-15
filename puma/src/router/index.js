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
  {
    path: '/discipline',
    name: 'Discipline',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/Discipline/Discipline.vue'),

  },
  {
    path: '/disciplineRegister',
    name: 'DisciplineRegister',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/DisciplineRegister/DisciplineRegister.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
