<template lang="html">
  <header class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 text-center py-3">
        <h2 class="title">Журнал заметок, <span v-html="userName"></span></h2>
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
        {id: 1, text: 'Добавить'},
			]
    }
  },
  created: function () {
    //this.links.push({id: 2, url: '#exit', text: 'Выйти'});
  },
  computed: {
    userName: function () {
      return '<span class="guest-ac" v-on:click="enter">Гостя</span>';
    }
  },
  methods: {
    enter: function () {
      console.log();
    }
  },
  components: {
    'navigation': NavigationComponent
  }
}
</script>

<style lang="css" scoped>
</style>
