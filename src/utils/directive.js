/**
 * vue自定义指令文件
 */

import Vue from 'vue'
import inputFilter from './inputFilter.js'

Vue.directive('inputFilter', inputFilter)

Vue.directive('blue', {
  bind(el) {
    el.style.backgroundColor = '#409EFF'
  }
})

// 更为优秀的写法--js
// import inputFilter from './inputFilter.js'

// const directives = {
//   inputFilter，
// }

// export default {
//   install(Vue) {
//     Object.keys(directives).forEach(key => {
//       Vue.directive(key, directives[key])
//     })
//   }
// }
