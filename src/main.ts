import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 插件
import VueCompositionApi from '@vue/composition-api'
import './utils/directive.js'
// import Directives from './utils/directive.js' // 自定义全局指令

import './plugins/element.ts'
import '@/styles/index.scss'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
// Vue.use(Directives)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
