import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 插件
import VueCompositionApi from '@vue/composition-api'
import './plugins/element.ts'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')