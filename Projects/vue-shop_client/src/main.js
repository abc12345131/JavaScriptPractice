import Vue from 'vue'
import VueRouter from "vue-router"
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router: router,
  store: store, 
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
