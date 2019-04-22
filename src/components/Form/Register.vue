<template lang="html">
  <form
  :action="params.action.url"
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-error-list">
      <span v-for="error in errors" class="error-item">{{ error[1] }}</span>
    </div>
    <div class="form-group">
      <label for="name">Имя(необязательно):</label>
      <input id="name" type="text" v-model="name" name="name">
    </div>
    <div class="form-group">
      <label for="email">E-mail:</label>
      <input id="email" type="email" v-model="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="password">Пароль:</label>
      <input id="password" type="password" v-model="password" name="password" required>
    </div>
    <div class="form-group">
      <label for="confirm">Повтор пароля:</label>
      <input id="confirm" type="password" v-model="confirm" name="confirm" required>
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
      error: {
        confirm: '',
        password: '',
      },
      errors: new Map([["408", "Заполните email!"], ["409", "Заполните пароль!"]]),
      _response: {},
    };
  },
  computed: {

  },
  watch: {
    confirm: 'checkPasswordsEquality',
    password: 'checkPasswordsEquality',
    email: 'checkEmail',
  },
  methods: {
    disabledSubmit: function () {
      console.log(this.errors.size);
      return this.errors.size === 0?false:true;
    },
    formSubmit: function (event) {
      event.preventDefault();
      var form = event.target;
      let data = new FormData(form);
      axios.post(form.action, {
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name')
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(response => {
        console.log(response);
        if (response.data.code == "200") {
          form.reset();
          this.errors.clear();
          this.$emit('closeModal');
          alert(response.data.answer);
          this.$cookies.set('user', response.data.data)
        } else {
          if (!this.errors.has(response.data.code)) {
            this.errors.set(response.data.code, response.data.answer);
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
