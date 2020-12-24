import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/dome',
    name: 'studyDome',
    component: () => import('@/views/study-dome/index.vue'),
    meta: {
      title: '学习页面'
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404页面'
    }
  }
]

const router = new Router({
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 进度条
  // // 验证当前路由所有的匹配中是否需要有登录验证的
  // if (to.matched.some((r) => r.meta.auth)) {
  //   // 是否存有token作为验证是否登录的条件
  //   const token = storage.get('ACCESS_TOKEN');
  //   if (token && token !== 'undefined') {
  //     // 是否处于登录页面
  //     if (to.path === loginRoutePath) {
  //       next({ path: defaultRoutePath });
  //       // 查询是否储存用户信息
  //     } else if (Object.keys(store.state.system.user.info).length === 0) {
  //       store.dispatch('system/user/getInfo').then(() => {
  //         next();
  //       });
  //     } else {
  //       next();
  //     }
  //   } else {
  //     // 没有登录的时候跳转到登录界面
  //     // 携带上登陆成功之后需要跳转的页面完整路径
  //     next({
  //       name: 'Login',
  //       query: {
  //         redirect: to.fullPath,
  //       },
  //     });
  //     NProgress.done();
  //   }
  // } else {
  //   // 不需要身份校验 直接通过
  //   next();
  // }
  next()
})

router.afterEach((to) => {
  NProgress.done() // 进度条
  document.title = to.meta.title
})

export default router
