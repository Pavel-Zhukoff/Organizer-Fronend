<template lang="html">
  <header class="container-fluid">
    <div class="row justify-content-center">
      <navigation :links="links"></navigation>
    </div>
  </header>
</template>

<script>
import NavigationComponent from './Navigation.vue' ;
export default {
  data () {
    return {
      links: [
        {id: 1, url: '/someLink', text: 'asdasd'},
			]
    }
  },
  computed: {
    itemsGet: function () {
      return this.cards.length > 0 ? true: false;
    }
  },
  components: {
    'navigation': NavigationComponent
  }
}
</script>

<style lang="css" scoped>
</style>
