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
  computed: {
    cardsExists: function () {
      return this.cards.length > 0;
    },
    cards: function () {
      console.log(this.$store.getters.CARDS);
      return this.$store.getters.CARDS;
    },
  },
  beforeCreate() {
    this.$store.dispatch('GET_CARDS');
  },
  components: {
    'desk-card': DeskCardComponent
  }
}
</script>
