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
    path: '/evaluationDetailssociology',
    name: 'EvaluationDetailsSociology',
    component: () => import('../views/EvaluationDetailsSociology/index.vue')
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
  }, {
    path: '/successtip',
    name: 'SuccessTip',
    component: () => import('../views/SuccessTip/index.vue')
  }, {
    path: '/errortip',
    name: 'ErrorTip',
    component: () => import('../views/ErrorTip/index.vue')
  }, {
    path: '/changepassword',
    name: 'ChangePassword',
    component: () => import('../views/ChangePassword/index.vue')
  },
  {
    path: '/assessmentList',
    name: 'AssessmentList',
    component: () => import('../views/AssessmentList/index.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
