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
      <label for="title">Заголовок:</label>
      <input id="title" type="text" v-model="title">
    </div>
    <div class="form-group">
      <label for="subtitle">Пометка:</label>
      <input id="subtitle" type="text" v-model="subtitle">
    </div>

    <div class="form-group">
      <label for="password">Текст заметки:</label>
      <textarea name="text" v-model="text"></textarea>
      <span>{{ countLength }} / {{ maxLength }}</span>
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
          text: 'Добавить',
        };
      },
    },
  },
  data() {
    return {
      title: '',
      subtitle: '',
      text: '',
      errors: new Map([["410", "Заполните текст заметки!"]]),
      maxLength: 200,
    };
  },
  computed: {
    countLength: function () {
      return this.text.length;
    },
  },
  watch: {
    text: function (value) {
      if (value.length < 1) {
        this.errors.set("410", "Заполните текст заметки!");
      } else {
        this.errors.delete("410")
      }
      if (value.length > this.maxLength) {
        this.text = value.substr(0, this.maxLength);
      }
    }
  },
  methods: {
    disabledSubmit: function () {
      if (this.errors.has("410")) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      var form = event.target;
      var vm = this;
      var response = axios.post(this.params.action.url, {
        title: vm.title,
        subtitle: vm.subtitle,
        text: vm.text,
        user_id: JSON.parse(localStorage.getItem('user')).user_id
      },{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(response) {
        if (response.data.code == "200") {
          form.reset();
          vm.errors.clear();
          vm.$parent.closeModal();
          alert(response.data.answer);
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
  }
}
</script>

<style lang="css" scoped>
</style>
