<template lang="html">
  <header class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 text-center py-3">
        <h2 class="title">Журнал заметок,
          <span class="user-name">
            {{ user.name }}
          </span>
        </h2>
      </div>
      <navigation :links="links"></navigation>
    </div>
  </header>
</template>

<script>
import NavigationComponent from './Navigation.vue' ;
export default {
  props: {
    actions: Object
  },
  data () {
    return {
      links: [
        {id: 1, action: this.actions.newNote, text: 'Добавить'},
        {id: 2, action: this.actions.enter, text: 'Войти'},
        {id: 3, action: this.actions.register, text: 'Регистрация'},
			]
    }
  },
  created: function () {
    //this.links.push({id: 2, url: 'exit', text: 'Выйти'});
  },
  computed: {
    user: function () {
      return {
        name: 'Гостя'
      };
    }
  },
  components: {
    'navigation': NavigationComponent
  }
}
</script>

<style lang="css" scoped>
</style>
