import Vue from 'vue/dist/vue.js';
import VueCookies from 'vue-cookies';
import appComponent from '../components/App.vue';

Vue.use(VueCookies);
new Vue({
  el: "#app",
  beforeCreate: function () {
    document.title = 'Мастер заметок';
  },
  components: {
    app: appComponent
  }
});
console.log(VueCookies);
