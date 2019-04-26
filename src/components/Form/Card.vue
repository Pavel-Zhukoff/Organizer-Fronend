<template lang="html">
  <form
  action=""
  :method="params.method"
  v-on:submit="formSubmit"
  >
    <div class="form-error-list">
      <span v-for="[index, error] in errorsList" v-text.sync="error" class="error-item"></span>
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
      errors: new Map(),
      changes: 1,
    };
  },
  created: function () {
    this.errors.set("410", "Заполните текст заметки!");
  },
  computed: {
    countLength: function () {
      return this.text.length;
    },
    errorsList: function () {
      return this.changes && Array.from(this.errors);
    },
  },
  watch: {
    text: "textWatcher",
  },
  methods: {
    textWatcher: function () {
      let { text } = this;
      if (text.length < 1) {
        this.errors.set("410", "Заполните текст заметки!");
        this.changes += 1;
      } else {
        this.errors.delete("410");
        this.changes += 1;
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
        title: this.title.trim(),
        subtitle: this.subtitle.trim(),
        text: this.text.trim(),
        path: this.params.action.url
      })
      .then((data) => {
        if (data.code === "200") {
          this.errors.clear();
          this.changes += 1;
          this.$parent.$emit('close');
          this.title = "";
          this.subtitle = "";
          this.text = "";
          alert(data.answer);
        } else {
          if (!this.errors.has(data.code)) {
            this.errors.set( data.code, data.answer );
            this.changes += 1;
          }
        }
      });
    },
  }
}
</script>

<style lang="css" scoped>
</style>
