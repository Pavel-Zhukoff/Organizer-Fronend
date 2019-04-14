<template lang="html">
  <form
  :action="params.action"
  :method="params.method">
    <template v-if="inputsExists">
      <input-component
        v-for="input in params.inputs"
        :key="input.id"
        :params="input"
      ></input-component>
    </template>
    <template v-if="textareasExists">
      <textarea-component
      v-for="textarea in params.textareas"
      :key="textarea.id"
      :params="textarea"
      ></textarea-component>
    </template>
    <input
    type="submit"
    name="submit"
    :value="params.text"
    v-on:click="params.action">
  </form>
</template>

<script>
import InputComponent from './Input.vue';
import TextareaComponent from './Textarea.vue';

export default {
  props: {
    params: {
      type: Object,
      default: function () {
        return {
          action: '#',
          method: 'post',
          text: 'Отправить',
          action: function () {},
          inputs: [],
          textareas: []
        };
      },
    },
  },
  computed: {
    inputsExists: function () {
      return this.params.inputs.length > 0;
    },
    textareasExists: function () {
      return this.params.textareas.length > 0;
    },
  },
  components: {
    'input-component': InputComponent,
    'textarea-component': TextareaComponent,
  }
}
</script>

<style lang="css" scoped>
</style>
