<template>

<div class="container">
  <div v-if="cardsExists" class="row py-3">
    <desk-card
      v-for="card in cards"
      :key="card.id"
      :card="card"
      ></desk-card>
  </div>
  <div v-else class="row">
    <div class="col-12">
      <div class="task-container">
        <span class="task-container-text">
          Заметок нет!
        </span>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';

import DeskCardComponent from './DeskCard.vue' ;
export default {
  data () {
    return {
      cards: [],
    }
  },
  computed: {
    cardsExists: function () {
      return this.cards.length > 0;
    }
  },
  created: function () {
    var vm = this;
    axios.post(vm.$parent.backendUrl + '/note', {
      user_id: JSON.parse(localStorage.getItem('user')).user_id
    },{
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response) {
      vm.cards = response.data.answer;
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    getCards: function () {
      var vm = this;
      axios.post(vm.$parent.backendUrl + '/note', {
        user_id: JSON.parse(localStorage.getItem('user')).user_id
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(response) {
        vm.cards = response.data.answer;
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  components: {
    'desk-card': DeskCardComponent
  }
}
</script>
