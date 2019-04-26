<template lang="html">
  <form
  action=""
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-error-list">
      <span v-for="[index, error] in errorsList" v-text="error" class="error-item"></span>
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
      errors: new Map(),
      changes: 1,
    };
  },
  created: function () {
    this.errors.set( "409", "Заполните пароль!" );
    this.errors.set( "408", "Заполните email!" );
  },
  watch: {
    password: "checkPasswordsEquality",
    email: "checkEmail",
  },
  computed: {
    errorsList: function () {
      return this.changes && Array.from(this.errors);
    },
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
        email: this.email.trim(),
        password: this.password.trim(),
        path: this.params.action.url
      })
      .then((data) => {
        if (data.code === "200") {
          this.errors.clear();
          this.changes += 1;
          this.$store.dispatch("LOGIN_USER", data);
          this.$parent.$emit('close');
          this.email = "";
          this.password = "";
          alert(data.answer);
        } else {
          if (!this.errors.has(data.code)) {
            this.errors.set( data.code, data.answer );
            this.changes += 1;
          }
        }
      });
      console.log(this.errors);
    },
    checkEmail: function () {
      const { email } = this;
      if (email.length < 1) {
        this.errors.set( "408", "Заполните email!" );
        this.changes += 1;
      } else {
        this.errors.delete("408");
        this.changes += 1;
      }
    },
    checkPasswordsEquality: function () {
      const { password } = this;
      if (password.length < 1) {
        this.errors.set( "409", "Заполните пароль!" );
        this.changes += 1;
      } else {
        this.errors.delete("409");
        this.changes += 1;
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
