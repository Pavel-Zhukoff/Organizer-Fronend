import Vue from 'vue/dist/vue.js';

import axios from 'axios';

import appComponent from '../components/App.vue';

// TODO: Сделать фронтенд для пользователя

new Vue({
  el: "#app",
  beforeCreate: function () {
    document.title = 'Мастер заметок';
  },
  components: {
    app: appComponent
  },
});
