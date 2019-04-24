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
      errors: '',
      maxLength: 200,
    };
  },
  mounted: function () {
    this.errors = this.$store.getters.ERRORS;
  },
  computed: {
    countLength: function () {
      return this.text.length;
    },
  },
  watch: {
    text: function (value) {
      if (value.length < 1) {
        this.$store.commit('ADD_ERROR', {id: '410', text: 'Заполните текст заметки!'});
      } else {
        this.$store.commit('REMOVE_ERROR', '410');
      }
      if (value.length > this.maxLength) {
        this.text = value.substr(0, this.maxLength);
      }
    }
  },
  methods: {
    disabledSubmit: function () {
      if (this.$store.getters.ERRORS.has("410")) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      this.$store.dispatch('ADD_CARD', {
        title: this.title,
        subtitle: this.subtitle,
        text: this.text,
        path: this.params.action.url
      })
      .then((data) => {
        if (data.code === "200") {
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
  }
}
</script>

<style lang="css" scoped>
</style>
