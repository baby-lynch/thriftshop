import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'localhost:8080/#'
Vue.prototype.$message = ElementUI.Message

Vue.config.productionTip = false

require('./mock/index.js')

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
