import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/myassessment',
    name: 'MyAssessment',
    component: () => import('../views/MyAssessment/index.vue')
  },
  {
    path: '/personalcenter',
    name: 'PersonalCenter',
    component: () => import('../views/PersonalCenter/index.vue')
  },
  {
    path: '/evaluationobject',
    name: 'EvaluationObject',
    component: () => import('../views/EvaluationObject/index.vue')
  },
  {
    path: '/evaluationdetails',
    name: 'EvaluationDetails',
    component: () => import('../views/EvaluationDetails/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
