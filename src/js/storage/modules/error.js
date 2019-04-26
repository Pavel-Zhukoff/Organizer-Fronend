import Axios from "axios";

let state = {
  errors: new Map(),
};

let getters = {
  ERRORS: state => {
    return state.errors;
  },
};

let mutations = {
  SET_ERRORS: (state, payload) => {
    state.errors = payload;
  },
  CLEAR_ERRORS: (state) => {
    state.errors.clear();
  },
  ADD_ERROR: (state, payload) => {
    state.errors.set(payload.id, payload.text);
  },
  REMOVE_ERROR: (state, payload) => {
    state.errors.delete(payload)
  },
};

let actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
