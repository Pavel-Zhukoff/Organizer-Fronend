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
import { mapState } from 'vuex';

export default {
  props: {
    params: {
      type: Object,
      default: function () {
        return {
          action: {
            url: "#",
          },
          method: "post",
          text: "Отправить",
        };
      },
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created: function () {
    this.$store.commit("ADD_ERROR", {id: "409", text: "Заполните пароль!"});
    this.$store.commit("ADD_ERROR", {id: "408", text: "Заполните email!"});
  },
  watch: {
    password: "checkPasswordsEquality",
    email: "checkEmail",
  },
  computed: {
    ...mapState({
      errors: (state) => state.error.errors,
    }),
  },
  methods: {
    disabledSubmit: function () {
      if ( this.errors.has("408")
        || this.errors.has("409") ) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      this.$store.dispatch("GET_USER_BY_PASSWORD", {
        email: this.email,
        password: this.password,
        path: this.params.action.url
      })
      .then((data) => {
        if (data.code === "200") {
        this.$store.commit("CELAR_ERRORS");
          this.$store.dispatch("LOGIN_USER", data);
          this.$parent.$emit('close');
          this.email = "";
          this.password = "";
          alert(data.answer);
        } else {
          if (!this.errors.has(data.code)) {
            this.$store.commit("ADD_ERROR", {id: data.code, text: data.answer});
          }
        }
      });
    },
    checkEmail: function () {
      const { email } = this;
      if (email.length < 1) {
        this.$store.commit("ADD_ERROR", {id: "408", text: "Заполните email!"});
      } else {
        this.$store.commit("REMOVE_ERROR", "408");
      }
    },
    checkPasswordsEquality: function () {
      const { password } = this;
      if (password.length < 1) {
        this.$store.commit("ADD_ERROR", {id: "409", text: "Заполните пароль!"});
      } else {
        this.$store.commit("REMOVE_ERROR", "409");
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
