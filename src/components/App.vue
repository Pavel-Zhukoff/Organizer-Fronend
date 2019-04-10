<template>

  <div>
    <header-component></header-component>
    <desk></desk>
  </div>

</template>

<script>
import HeaderComponent from './Common/Header.vue';
import DeskComponent from './Desk/Desk.vue' ;

export default {
  components: {
    'header-component': HeaderComponent,
    'desk': DeskComponent
  }
}
</script>
