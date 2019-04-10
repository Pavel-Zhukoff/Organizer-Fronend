<template>

<div class="card">
  <span class="card-button-remove">х</span>
  <div class="card-title">
    <h2 class="title">{{ card.title }}</h2>
    <h3 class="subtitle">{{ card.subtitle }}</h3>
  </div>
  <div class="card-content">
    <p>
      {{ card.text }}
    </p>
  </div>
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
