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
      links: new Map([
        ['add', {action: this.actions.newNote, text: 'Добавить'}],
        ['enter', {action: this.actions.login, text: 'Войти'}],
        ['register', {action: this.actions.signup, text: 'Регистрация'}],
			])
    }
  },
  computed: {
    userName: function () {
      var userName = 'Гостя'
      if (localStorage.getItem('user') !== null) {
        userName = JSON.parse(localStorage.getItem('user')).name;
        this.links.delete('enter');
        this.links.delete('register');
        this.links.set('exit', {action: this.actions.logout, text: 'Выйти'})
      }
      return userName;
    }
  },
  components: {
    'navigation': NavigationComponent
  }
}
</script>

<style lang="css" scoped>
</style>
