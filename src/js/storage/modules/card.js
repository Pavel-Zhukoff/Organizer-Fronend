import Axios from 'axios';

let state = {
  cards: [],
};

let getters = {
  CARDS: state => {
    return state.cards;
  },
};

let mutations = {
  SET_CARDS: (state, payload) => {
    state.cards = payload;
  },
  ADD_CARD: (state, payload) => {
    state.cards.push(payload);
  },
  CLEAR_CARDS: (state) => {
    state.cards = [];
  },
  SAVE_CARDS: (state) => {
    localStorage.setItem('cards', JSON.stringify(state.CARDS));
  },
};

let actions = {
  GET_CARDS: async (context) => {
    console.log(context.getters.CARDS);
    if ( context.getters.USER.user_id !== -1 ) {
      let { data } = await Axios.post(context.getters.BACKEND_URL + '/note', {
        user_id: context.getters.USER.user_id
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      context.commit('SET_CARDS', data.answer);
    } else {
      context.commit('SET_CARDS', JSON.parse(localStorage.getItem('cards')) == null? [] : JSON.parse(localStorage.getItem('cards')));
    }
    context.commit('SAVE_CARDS');
  },
  DELETE_CARD: async (context, payload) => {
    if ( context.getters.USER.user_id !== -1 ) {
      let { data } = await Axios.post(context.getters.BACKEND_URL + '/note/delete', {
        id: payload
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      return data;
    } else {
      var indexOuter = null;
      context.getters.CARDS.forEach( (item, index, array) => {
        if (item.note_id == payload) {
          indexOuter = index;
        }
      });
      context.getters.CARDS.splice(indexOuter, 1);
    }
    context.commit('SAVE_CARDS');
  },
  ADD_CARD: async (context, payload) => {
    if ( context.getters.USER.user_id !== -1 ) {
      let { data } = await Axios.post(context.getters.BACKEND_URL + payload.path, {
        title: payload.title,
        subtitle: payload.subtitle,
        text: payload.text,
        user_id: context.getters.USER.user_id
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      return data;
    } else {
      let card = {
        note_id: context.getters.CARDS.length,
        title: payload.title,
        subtitle: payload.subtitle,
        text: payload.text
      };
      context.commit('ADD_CARD', card);
      return {answer: "Заметка добавлена!", code: "200"};
    }
    context.commit('SAVE_CARDS');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
