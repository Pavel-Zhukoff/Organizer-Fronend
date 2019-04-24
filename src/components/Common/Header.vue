<template lang="html">
  <header class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 text-center py-3">
        <h2 class="title">Журнал заметок,
          <span class="user-name">
            {{ userName }}
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
      links: new Map()
    }
  },
  computed: {
    userName: function () {
      if (this.$store.getters.USER.user_id !== -1) {
        this.links = new Map([
          ['add', {action: this.actions.newNote, text: 'Добавить'}],
          ['exit', {action: this.actions.logout, text: 'Выйти'}],
  			]);
      } else {
        this.links = new Map([
          ['add', {action: this.actions.newNote, text: 'Добавить'}],
          ['enter', {action: this.actions.login, text: 'Войти'}],
          ['register', {action: this.actions.signup, text: 'Регистрация'}],
  			]);
      }
      return  this.$store.getters.USER.name;
    },
  },
  components: {
    'navigation': NavigationComponent
  }
}
</script>

<style lang="css" scoped>
</style>
