<template lang="html">
  <form
  :action="params.action.url"
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-error-list">
      <span v-for="[index, error] in errorsList" v-text="error" class="error-item"></span>
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
      confirm: "",
      name: "",
      errors: new Map(),
      changes: 1,
    };
  },
  created: function () {
    this.errors.set( "409", "Заполните пароль!" );
    this.errors.set( "408", "Заполните email!" );
  },
  watch: {
    confirm: "checkPasswordsEquality",
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
      if ( this.errors.has("406")
        || this.errors.has("407")
        || this.errors.has("408")
        || this.errors.has("409") ) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      this.$store.dispatch("ADD_USER", {
        email: this.email.trim(),
        password: this.password.trim(),
        name: this.name.trim(),
        path: this.params.action.url
      })
      .then((data) => {
        if (data.code === "200") {
          this.errors.clear();
          this.changes += 1;
          this.$store.dispatch("LOGIN_USER", data);
          this.email = "";
          this.password = "";
          this.confirm = "";
          this.name = "";
          this.$parent.$emit('close');
          alert(data.answer);
        } else {
          if (!this.errors.has(data.code)) {
            this.errors.set( data.code, data.answer );
            this.changes += 1;
          }
        }
      });
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
      const { password, confirm } = this;
      if (!password.match("((?:[a-z][a-z]*[0-9]+[a-z0-9]*))") && password.length < 8) {
        this.errors.set( "407", "Пароль должен быть не короче 8 символов и содержать только буквы латинского алфавита и цифры!" );
        this.changes += 1;
      } else {
        this.errors.delete("407");
        this.changes += 1;
      }

      if (password !== confirm) {
        this.errors.set( "406", "Пароли не совпадают!" );
        this.changes += 1;
      } else {
        this.errors.delete("406");
        this.changes += 1;
      }

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
