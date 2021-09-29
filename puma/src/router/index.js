import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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
<<<<<<< HEAD
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
=======
    path: '/proposta/cadastro',
    name: 'Cadastrar Proposta',
    component: () => import('../views/proposta/Cadastro')
>>>>>>> def2a57594c41f8add06f1ef19a15a5a64fb5b52
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
