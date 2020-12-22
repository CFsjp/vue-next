import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/api',
    name: 'CompositionApi',
    component: () => import('@/views/composition-api.vue')
  },
  {
    path: '/amap',
    name: 'gaoDeMap',
    component: () => import('@/views/amap.vue')
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/views/animation/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = new Router({
  routes
})

export default router
