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
          text: "Добавить",
        };
      },
    },
  },
  data() {
    return {
      title: "",
      subtitle: "",
      text: "",
      maxLength: 200,
    };
  },
  created: function () {
    this.$store.commit("ADD_ERROR", {id: "410", text: "Заполните текст заметки!"});
  },
  computed: {
    ...mapState({
      errors: (state) => state.error.errors,
    }),
    countLength: function () {
      return this.text.length;
    },
  },
  watch: {
    text: "textWatcher",
  },
  methods: {
    textWatcher: function () {
      let { text } = this;
      if (text.length < 1) {
        this.$store.commit("ADD_ERROR", {id: "410", text: "Заполните текст заметки!"});
      } else {
        this.$store.commit("REMOVE_ERROR", "410");
      }
      if (text.length > this.maxLength) {
        this.text = text.substr(0, this.maxLength);
      }
    },
    disabledSubmit: function () {
      if (this.errors.has("410")) {
        return true;
       } else {
        return false;
      }
    },
    formSubmit: function (event) {
      event.preventDefault();
      this.$store.dispatch("ADD_CARD", {
        title: this.title,
        subtitle: this.subtitle,
        text: this.text,
        path: this.params.action.url
      })
      .then((data) => {
        if (data.code === "200") {
          this.$store.commit("CELAR_ERRORS");
          this.$parent.$emit('close');
          this.title = "";
          this.subtitle = "";
          this.text = "";
          alert(data.answer);
        } else {
          if (!this.errors.has(data.code)) {
            this.$store.commit("ADD_ERROR", {id: data.code, text: data.answer});
          }
        }
      });
    },
  }
}
</script>

<style lang="css" scoped>
</style>
