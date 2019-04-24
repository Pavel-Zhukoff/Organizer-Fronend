<template lang="html">
  <form
  :action="params.action.url"
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-error-list">
      <span v-for="error in errors" v-text="error[1]" class="error-item"></span>
    </div>
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
    </div>
    <div class="form-group">
      <label for="confirm">Повтор пароля:</label>
      <input id="confirm" type="password" v-model="confirm" required>
    </div>
    <input
    id="submit"
    type="submit"
    name="submit"
    :value="params.text"
    :disabled="disabledSubmit()"
    >
  </form>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    params: {
      type: Object,
      default: function () {
        return {
          action: {
            url: '#',
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
    };
  },
  computed: {
    errors() {
      return this.$store.getters.ERRORS;
    },
  },
  watch: {
    confirm: 'checkPasswordsEquality',
    password: 'checkPasswordsEquality',
    email: 'checkEmail',
  },
  methods: {
    disabledSubmit: function () {
      if ( this.$store.getters.ERRORS.has("406")
        || this.$store.getters.ERRORS.has("407")
        || this.$store.getters.ERRORS.has("408")
        || this.$store.getters.ERRORS.has("409") ) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      this.$store.dispatch('ADD_USER', {
        email: this.email,
        password: this.password,
        name: this.name,
        path: this.params.action.url
      })
      .then((data) => {
        console.log(data);
        if (data.code === "200") {
          this.$store.dispatch('LOGIN_USER', data);
          event.target.reset();
          this.$parent.closeModal();
          alert(data.answer);
        } else {
          if (!this.$store.getters.ERRORS.has(data.code)) {
            this.$store.commit('ADD_ERROR', {id: data.code, text: data.answer});
          }
        }
      });
    },
    checkEmail: function () {
      const { email } = this;
      if (email.length < 1) {
        this.$store.commit('ADD_ERROR', {id: '408', text: 'Заполните email!'});
      } else {
        this.$store.commit('REMOVE_ERROR', '408');
      }
    },
    checkPasswordsEquality: function () {
      const { password, confirm } = this;
      if (!password.match("((?:[a-z][a-z]*[0-9]+[a-z0-9]*))") && password.length < 8) {
        this.$store.commit('ADD_ERROR', {id: '407', text: 'Пароль должен быть не короче 8 символов и содержать только буквы латинского алфавита и цифры!'});
      } else {
        this.$store.commit('REMOVE_ERROR', '407');
      }

      if (password !== confirm) {
        this.$store.commit('ADD_ERROR', {id: '406', text: 'Пароли не совпадают!'});
      } else {
        this.$store.commit('REMOVE_ERROR', '406');
      }

      if (password.length < 1) {
        this.$store.commit('ADD_ERROR', {id: '409', text: 'Заполните пароль!'});
      } else {
        this.$store.commit('REMOVE_ERROR', '409');
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
