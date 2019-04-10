<template>

<div v-if="cardsExists" class="container">
  <div v-if="cardsExists" class="row">
    <desk-card
      v-for="card in cards"
      :key="card.id"
      :card="card"
      class="col-lg-4 col-md-3 col-12"></desk-card>
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
import DeskCardComponent from './DeskCard.vue' ;
export default {
  data () {
    return {
      cards: [
			]
    }
  },
  computed: {
    cardsExists: function () {
      return this.cards.length > 0 ? true: false;
    }
  },
  components: {
    'desk-card': DeskCardComponent
  }
}
</script>
