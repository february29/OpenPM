// const files = require.context('./svg', true, /\.svg$/)

// const modules = {}

// files.keys().forEach((key) => {
//   modules[key.replace(/(\.\/|\.svg)/g, '')] = files(key)
// })
// export default modules


import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)