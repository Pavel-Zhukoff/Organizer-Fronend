<template lang="html">
  <form
  action=""
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-error-list">
      <span v-for="error in errors" v-text="error[1]" class="error-item"></span>
    </div>
    <div class="form-group">
      <label for="email">Логин(e-mail):</label>
      <input id="email" type="email" v-model="email" required>
    </div>
    <div class="form-group">
      <label for="password">Пароль:</label>
      <input id="password" type="password" v-model="password" required>
    </div>
    <input
    type="submit"
    :value="params.text"
    :disabled="disabledSubmit()"
    >
  </form>
</template>

<script>
import {mapGetters} from 'vuex';

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
      errors: '',
    };
  },
  mounted: function () {
    this.errors = this.$store.getters.ERRORS;
  },
  watch: {
    password: 'checkPasswordsEquality',
    email: 'checkEmail',
  },
  methods: {
    disabledSubmit: function () {
      if (this.$store.getters.ERRORS.has("408")  || this.$store.getters.ERRORS.has("409")) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      this.$store.dispatch('GET_USER_BY_PASSWORD', {
        email: this.email,
        password: this.password,
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
      const { password } = this;
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
