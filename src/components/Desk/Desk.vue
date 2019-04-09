<template>

<div class="desk-card">
  <desk-card v-for="card in cards" :key="card.id" :card="card"></desk-card>
</div>

</template>

<script>
import deskCardComponent from './DeskCard.vue' ;
export default {
  data () {
    return {
      cards: [
				{
					id: 1,
					text: 'Learn Vue'
				},
				{
					id: 2,
					text: 'Learn about single-file components'
				},
				{
					id: 3,
					text: 'Fall in love'
				}
			]
    }
  },
  components: {
    'desk-card': deskCardComponent
  }
}
</script>
