import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import apolloClient from "./ApolloClient";

Vue.config.productionTip = false;

import InfiniteLoading from "vue-infinite-loading";
Vue.use(InfiniteLoading);

import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

import VueApollo from "vue-apollo";
Vue.use(VueApollo);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
