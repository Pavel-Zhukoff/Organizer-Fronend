import Vue from "vue/dist/vue.js";
import { storage } from "./storage/index";

import appComponent from "../components/App.vue";


new Vue({
  el: "#app",
  store: storage,
  beforeCreate: function () {
    document.title = "Мастер заметок";
  },
  components: {
    app: appComponent
  },
});
