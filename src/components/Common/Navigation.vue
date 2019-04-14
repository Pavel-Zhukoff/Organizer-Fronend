<template lang="html">
  <nav class="col-lg-9 col-md-10 col-12">
    <span v-for="link in links" :key="link.id" :link="link"
     :data-target="link.url"
     class="nav-item">
     {{ link.text }}
    </span>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
