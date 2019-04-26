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
import { mapState, mapGetters } from 'vuex';
import DeskCardComponent from "./DeskCard.vue";

export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    ...mapState({
      cards: (state) => state.card.cards,
      cardsExists: (state) => state.card.cards.length > 0,
    }),
  },
  created: function () {
    this.$store.dispatch("GET_CARDS");
  },

  components: {
    "desk-card": DeskCardComponent
  }
}
</script>
