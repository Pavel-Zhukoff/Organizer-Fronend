import Vue from 'vue/dist/vue.js';
import VueCookies from 'vue-cookies';

import axios from 'axios';

import appComponent from '../components/App.vue';

// TODO: Сделать фронтенд для пользователя

Vue.use(VueCookies);
new Vue({
  el: "#app",
  beforeCreate: function () {
    document.title = 'Мастер заметок';
  },
  components: {
    app: appComponent
  },
});
