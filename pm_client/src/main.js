import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'

//引入svg组件
// import IconSvg from '@/components/IconSvg'
// //全局注册icon-svg
// Vue.component('icon-svg', IconSvg)


import { format, chaining } from '@/utils/tools'

Vue.config.productionTip = false
Vue.prototype.format = format
Vue.prototype.chaining = chaining
Vue.use(ElementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

