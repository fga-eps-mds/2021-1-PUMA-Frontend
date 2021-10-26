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
    path: '/evaluate/:subjectId',
    name: 'Evaluate',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/Evaluate/Evaluate.vue'),
  },
  {
    path: '/approval/:projId',
    name: 'Approval',
    props: true,
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/Approval/Approval.vue'),
  },
  {
    path: '/home/professor',
    name: 'HomeProfessor',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/Home/Professor.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
