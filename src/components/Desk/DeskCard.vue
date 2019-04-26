<template>

<div class="col-lg-4 col-md-6 col-12 mb-2">
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
    <div class="card-footer">
      {{ cardDate }}
    </div>
  </div>
</div>

</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteCard: function (event) {
      this.$store.dispatch("DELETE_CARD", this.card.note_id)
      .then( (data) => {
        alert(data.answer);
      });
    },
  },
  computed: {
    cardDate: function () {
      let a = new Date();
      a.setTime(this.card.creation_date * 1000);
       return a.toLocaleDateString("ru-RU",{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>
