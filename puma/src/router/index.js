import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserService from '../services/userService';

const userService = new UserService();

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      guest: true,
    },

  },
  {
    path: '/evaluate/:subjectId',
    name: 'Evaluate',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/Evaluate/Evaluate.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/approval/:projId',
    name: 'Approval',
    props: true,
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/Approval/Approval.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userService.isUserLoggedIn()) {
      next({
        path: '/register',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!userService.isUserLoggedIn()) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
