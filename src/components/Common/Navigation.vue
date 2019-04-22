<template lang="html">
  <nav class="col-lg-9 col-md-10 col-12">
    <span
     v-for="link in links"
     v-on:click="link[1].action"
     class="nav-item">
     {{ link[1].text }}
    </span>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Map,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
