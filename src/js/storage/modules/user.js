import Axios from 'axios';

let state = {
  user: {user_id: -1, name: 'Гость'},
};

let getters = {
  USER: state => {
    return state.user;
  },
};

let mutations = {
  SET_USER: (state, payload) => {
    localStorage.setItem('user', JSON.stringify(payload));
    state.user = payload;
  },
};

let actions = {
  GET_USER: (context, payload) => {
    console.log(context.getters.USER);
    Axios.post(context.getters.BACKEND_URL + '/user', context.getters.USER, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then((response) => {
      if (response.data.code === "200") {
        context.commit('SET_USER', response.data.answer);
      } else {
        context.commit('SET_USER', {user_id: -1, name: 'Гость'});
      }
    })
    .catch((error) => {
      console.log(error);
      context.commit('SET_USER', {user_id: -1, name: 'Гость'});
    });

  },
  GET_USER_BY_PASSWORD: async (context, payload) => {
    let { data } = await Axios.post(context.getters.BACKEND_URL + payload.path, {
      email: payload.email,
      password: payload.password
    }, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} });
    return data;
  },
  REMOVE_USER: async (context) => {
    let {data} = await Axios.post(context.getters.BACKEND_URL + '/user/logout', context.getters.USER, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    if (data.code == "200") {
      alert( data.answer);
      context.commit('CLEAR_CARDS');
      if (context.getters.USER !== null) {
        context.commit('SET_USER', {user_id: -1, name: 'Гость'});
      }
    } else {
      alert( data.answer);
    }
  },
  ADD_USER: async (context, payload) => {
    let { data } = await Axios.post(context.getters.BACKEND_URL + payload.path, {
      email: payload.email,
      password: payload.password,
      name: payload.name
    },{
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    return data;
  },
  LOGIN_USER: (context, payload) => {
    context.commit('CLEAR_ERRORS');
    context.commit('CLEAR_CARDS');
    context.commit('SET_USER', payload.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
