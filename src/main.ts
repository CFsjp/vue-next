import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 插件
import VueCompositionApi from '@vue/composition-api'
import './plugins/element.ts'
import VueAMap from 'vue-amap'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'e4502ea2b50a7160fa3ee61916d61f33',
  // 插件集合
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation'
  ],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.15',
  uiVersion: '1.1'
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
