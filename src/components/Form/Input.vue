<template lang="html">
  <div class="form-group">
    <label
    :for="params.id + `-` + params.name"
    >
    {{ params.title }}
    </label>
    <input
    :id="params.id + `-` + params.name"
    :name="params.name"
    :type="params.type"
    :required="params.required"
    >
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
          type: 'text',
          title: 'Заголовок',
          required: 'false'
        };
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
