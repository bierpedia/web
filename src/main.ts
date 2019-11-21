import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading);

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
