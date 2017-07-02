// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// mount with global
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

// filter 转换单位为万, d:小数位数
Vue.filter('tt', (value, d = 2) => {
  return (Number.parseFloat(value || 0) / 10000).toFixed(d)
})
// filter 数组map
Vue.filter('mp', (value, p) => {
  if (value && Array.isArray(value)) {
    return value.map(v => v[p])
  } 
  return value  
})

// filter 数组join
Vue.filter('jn', (value, letter = '/') => {
  if (value && Array.isArray(value)) {
    return value.join(letter)
  } 
  return value  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
