<template>

<div class="card">
  <h3>{{ card.text }}</h3>
</div>

</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>
