import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import less from 'less'
Vue.use(less)

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import '@/icons' // icon
import '@/permission' // permission control

import VCharts from 'v-charts'
Vue.use(VCharts)

import Viser from 'viser-vue'
Vue.use(Viser)

import Print from 'vue-print-nb'
Vue.use(Print)

import VueBarcode from '@xkeshi/vue-barcode'
Vue.component('barcode', VueBarcode)

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)
Vue.use(VXETable)

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// import 'lib-flexible/flexible'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})