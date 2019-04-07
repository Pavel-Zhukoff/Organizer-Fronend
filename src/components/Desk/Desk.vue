<template>

<div class="card">
  <h3>{{ post.title }}</h3>
  <div v-html="post.content"></div>
</div>

</template>

<script>
export default {
  props: ['post'],
}
</script>
