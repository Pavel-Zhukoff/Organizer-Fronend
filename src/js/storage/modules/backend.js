import Axios from 'axios';

let state = {
  backendUrl: 'http://organizer-backend',
};

let getters = {
  BACKEND_URL: state => {
    return state.backendUrl;
  }
};

let mutations = { };

let actions = { };

export default {
  state,
  getters,
  mutations,
  actions,
};
