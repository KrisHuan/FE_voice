import Vue from 'vue'
import VueRouter from 'vue-router'
import Word from '../views/Word.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Word
  },
  {
    path: '/sentence',
    name: 'sentence',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "sentence" */ '../views/Sentence.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
