import Axios from "axios";

let state = {
  cards: JSON.parse(localStorage.getItem("cards")),
};

let getters = {
  CARDS: (state) => {
    return state.cards;
  },
  CARDS_COUNT: (state) => {
    return state.cards.length;
  },
};

let mutations = {
  SET_CARDS: (state, payload) => {
    localStorage.setItem("cards", JSON.stringify(payload));
    state.cards = payload;
  },
  ADD_CARD: (state, payload) => {
    state.cards.unshift(payload);
    localStorage.setItem("cards", JSON.stringify(state.cards));
  },
  CLEAR_CARDS: (state) => {
    state.cards = [];
    localStorage.setItem("cards", JSON.stringify(state.cards));
  },
  SAVE_CARDS: (state) => {
    localStorage.setItem("cards", JSON.stringify(state.cards));
  },
  DELETE_CARD: (state, payload) => {
    state.cards.splice(payload, 1);
  },
};

let actions = {
  GET_CARDS: async (context) => {
    if ( context.rootState.user.user.user_id !== -1 ) {
      let { data } = await Axios.post(context.getters.BACKEND_URL + "/note", {
        user_id: context.rootState.user.user.user_id
      },{
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      });
      if (data.code === "200") {
        context.commit("SET_CARDS", data.answer);
      } else {
        context.commit("SET_CARDS", [] );
      }
    } else {
      context.commit("SET_CARDS", JSON.parse(localStorage.getItem("cards") === null ? "[]" : localStorage.getItem("cards")));
    }
  },
  DELETE_CARD: async (context, payload) => {
    if ( context.rootState.user.user.user_id !== -1 ) {
      var { data } = await Axios.post(context.getters.BACKEND_URL + "/note/delete", {
        id: payload
      },{
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      });
    }
    var indexOuter = null;
    context.state.cards.forEach( (item, index, array) => {
      if (item.note_id == payload) {
        indexOuter = index;
      }
    });
    context.commit("DELETE_CARD", indexOuter);
    context.commit("SAVE_CARDS");
    return ( ( data != undefined ) ? data : {answer: "Заметка удалена!"} );
  },
  ADD_CARD: async (context, payload) => {
    if ( context.rootState.user.user.user_id !== -1 ) {
      let { data } = await Axios.post(context.getters.BACKEND_URL + payload.path, {
        title: payload.title,
        subtitle: payload.subtitle,
        text: payload.text,
        user_id: context.rootState.user.user.user_id
      },{
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      });
      context.dispatch("GET_CARDS");
      context.commit("SAVE_CARDS");
      return data;
    } else {
      let card = {
        note_id: (new Date()).getTime(),
        title: (payload.title.trim() == "" ? "Заметка #" + (new Date()).getTime() : payload.title ),
        subtitle: payload.subtitle,
        text: payload.text,
        creation_date: (new Date()).getTime()/1000,
      };
      context.commit("ADD_CARD", card);
      context.commit("SAVE_CARDS");
      return {answer: "Заметка добавлена!", code: "200"};
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
