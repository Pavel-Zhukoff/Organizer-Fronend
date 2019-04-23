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
      errors: new Map([["408", "Заполните email!"], ["409", "Заполните пароль!"]]),
    };
  },
  watch: {
    confirm: 'checkPasswordsEquality',
    password: 'checkPasswordsEquality',
    email: 'checkEmail',
  },
  methods: {
    disabledSubmit: function () {
      if (this.errors.has("406") || this.errors.has("407") || this.errors.has("408")  || this.errors.has("409")) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      var form = event.target;
      var vm = this;
      axios.post(form.action, {
        email: vm.email,
        password: vm.password,
        name: vm.name
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function (response) {
        if (response.data.code == "200") {
          form.reset();
          vm.errors.clear();
          vm.$parent.closeModal();
          localStorage.setItem('user', JSON.stringify(response.data.data));
          alert(response.data.answer);
        } else {
          if (!vm.errors.has(response.data.code)) {
            vm.errors.set(response.data.code, response.data.answer);
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    checkEmail: function () {
      const {email} = this;
      if (email.length < 1) {
        this.errors.set("408", "Заполните email!");
      } else {
        this.errors.delete("408")
      }
    },
    checkPasswordsEquality: function () {
      const { password, confirm } = this;
      if (!password.match("((?:[a-z][a-z]*[0-9]+[a-z0-9]*))") && password.length < 8) {
        this.errors.set("407", "Пароль должен быть не короче 8 символов и содержать только буквы латинского алфавита и цифры!");
      } else {
        this.errors.delete("407")
      }

      if (password !== confirm) {
        this.errors.set("406", "Пароли не совпадают!");
      } else {
        this.errors.delete("406")
      }

      if (password.length < 1) {
        this.errors.set("409", "Заполните пароль!");
      } else {
        this.errors.delete("409")
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
