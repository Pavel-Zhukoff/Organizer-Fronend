<template lang="html">
  <form
  :action="params.action.url"
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-group">
      <label for="name">Имя(необязательно):</label>
      <input id="name" type="text" v-model="name">
    </div>
    <div class="form-group">
      <label for="email">E-mail:</label>
      <input id="email" type="email" v-model="email" required>
    </div>
    <div class="form-group">
      <label for="password">Пароль:</label>
      <input id="password" type="password" v-model="password" required>
      <span class="error" v-text="error.password"></span>
    </div>
    <div class="form-group">
      <label for="confirm">Повтор пароля:</label>
      <input id="confirm" type="password" v-model="confirm" required>
      <span class="error" v-text="error.confirm"></span>
    </div>
    <input
    id="submit"
    type="submit"
    name="submit"
    :value="params.text"
    >
  </form>
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      default: function () {
        return {
          action: {
            url: '#',
            func: function () {},
          },
          method: 'post',
          text: 'Отправить',
        };
      },
    },
  },
  data() {
    return {
      email: '',
      password: '',
      confirm: '',
      name: '',
      error: {
        confirm: '',
        password: '',
      }
    };
  },
  watch: {
    confirm: function (value) {
      if (this.password != value) {
        this.error.confirm = ' Пароли не совпадают!';
        document.getElementById('submit').setAttribute('disabled', 'disabled');
      } else {
        document.getElementById('submit').removeAttribute('disabled');
        this.error.confirm = '';
        this.error.password = '';
      }
    },
    password: function (value) {
      if (this.confirm != value) {
        this.error.password = ' Пароли не совпадают!';
        document.getElementById('submit').setAttribute('disabled', 'disabled');
      } else {
        document.getElementById('submit').removeAttribute('disabled');
        this.error.confirm = '';
        this.error.password = '';
      }
      if (value.length < 8) {
        this.error.password = ' Пароль должен быть длиннее 8 символов!';
      } else {
        this.error.password = '';
      }
    },
  },
  methods: {
    formSubmit: function (event) {
      event.preventDefault();
      let form = event.target;
      let data = new FormData(form);
      this.$emit(this.params.action.func, event, data);
    },
  }
}
</script>

<style lang="css" scoped>
</style>
