<template>

<div class="col-lg-4 col-md-6 col-12 mb-md-0 mb-2">
  <div class="card">
    <div class="card-button-remove" :data-target="card.id"></div>
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
