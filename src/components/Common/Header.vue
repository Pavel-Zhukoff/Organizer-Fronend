<template lang="html">
  <header class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 text-center py-3">
        <h2 class="title">Журнал заметок</h2>
      </div>
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
  components: {
    'navigation': NavigationComponent
  }
}
</script>

<style lang="css" scoped>
</style>
