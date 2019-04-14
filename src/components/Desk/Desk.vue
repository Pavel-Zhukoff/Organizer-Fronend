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
import DeskCardComponent from './DeskCard.vue' ;
export default {
  data () {
    return {
      cards: this.getCards()
    }
  },
  computed: {
    cardsExists: function () {
      return this.cards.length > 0;
    }
  },
  methods: {
    getCards: function () {
      return [
        {id: 1, title: 'Заголовок #1', subtitle: 'Примечание', text: 'Какой-то текст. Заметка о чем-то. Купить хлеба!'},
        ];
    }
  },
  components: {
    'desk-card': DeskCardComponent
  }
}
</script>
