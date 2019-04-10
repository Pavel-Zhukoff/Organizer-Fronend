import Vue from 'vue/dist/vue.js';
import appComponent from '../components/App.vue';

new Vue({
  el: "#app",
  beforeCreate: function () {
    document.title = 'asdasd';
  },
  components: {
    app: appComponent
  }
})
