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
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
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
    path: '/upload',
    name: 'upload',
    component: () => import('@/components/upload.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/Form.vue')
  },
  {
    path: '/count',
    name: 'count',
    component: () => import('@/views/Count.vue')
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
