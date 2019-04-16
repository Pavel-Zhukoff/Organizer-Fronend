<template lang="html">
  <div class="form-group">
    <label
    :for="params.id + `-` + params.name"
    >
    {{ params.title }}
    </label>
    <textarea
    :id="params.id + `-` + params.name"
    :name="params.name"
    :required="params.required"
    ></textarea>
  </div>

</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      default: function () {
        return {
          id: 0,
          name: 'default',
          title: 'Заголовок',
          required: false,
        };
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
