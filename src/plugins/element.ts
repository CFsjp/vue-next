/**
 * 按需加载 element-ui 组件
 * @description
 * [参考官网 - 按需加载](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)
 */
import Vue from 'vue'

// // 方式一：按需加载
import { Button, Loading, Message, Dialog } from 'element-ui'

Vue.use(Button)
Vue.use(Dialog)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

// 方式二：完整加载方式
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)
