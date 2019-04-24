<template>

<div class="col-lg-4 col-md-6 col-12 mb-md-0 mb-2">
  <div class="card">
    <div class="card-button-remove"
      v-on:click="deleteCard"></div>
    <div class="card-title">
      <h2 class="title">{{ card.title }}</h2>
      <h3 class="subtitle">{{ card.subtitle }}</h3>
    </div>
    <div class="card-content">
      <p>
        {{ card.text }}
      </p>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteCard: function (event) {
      this.$store.dispatch('DELETE_CARD', this.card.note_id)
      .then( (data) => {
        alert(data.answer);
      });
    },
  },
}
</script>
