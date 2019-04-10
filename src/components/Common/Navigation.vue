<template lang="html">
  <nav class="col-lg-9 col-md-10 col-12">
    <a v-for="link in links" :key="link.id" :link="link"
     :href="link.url"
     class="nav-item">
     {{ link.text }}
    </a>
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
