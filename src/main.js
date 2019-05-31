import Vue from 'vue'
import App from './App.vue'
import { store } from './store';

Vue.config.productionTip = false

export const bus = new Vue();
new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
