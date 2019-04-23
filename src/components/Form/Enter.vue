<template lang="html">
  <form
  action=""
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-error-list">
      <span v-for="error in errors" v-text.sync="error[1]" class="error-item"></span>
    </div>
    <div class="form-group">
      <label for="email">Логин(e-mail):</label>
      <input id="email" type="email" v-model="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="password">Пароль:</label>
      <input id="password" type="password" v-model="password" name="password" required>
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
      name: '',
      errors: new Map([["408", "Заполните email!"], ["409", "Заполните пароль!"]]),
      _response: '',
    };
  },
  computed: {

  },
  watch: {
    password: 'checkPasswordsEquality',
    email: 'checkEmail',
  },
  methods: {
    disabledSubmit: function () {
      if (this.errors.has("408")  || this.errors.has("409")) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      var form = event.target;
      let data = new FormData(form);
      var vm = this;
      var response = axios.post(this.params.action.url, {
        email: data.get('email'),
        password: data.get('password')
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(response) {
        if (response.data.code == "200") {
          form.reset();
          vm.errors.clear();
          vm.$emit('closeModal');
          alert(response.data.answer);
          console.log(response.data.data);
          localStorage.setItem('user', JSON.stringify(response.data.data));
        } else {
          if (!vm.errors.has(response.data.code)) {
            vm.errors.set(response.data.code, response.data.answer);
          }
        }
      })
      .catch(error => {
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
      const { password } = this;
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
