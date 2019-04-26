import Vue from "vue/dist/vue.js";
import Vuex from "vuex";

import Axios from "axios";

import card from "./modules/card";
import user from "./modules/user";
import error from "./modules/error";
import backend from "./modules/backend";

Vue.use(Vuex);

export const storage = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    card,
    user,
    error,
    backend,
  },
});
