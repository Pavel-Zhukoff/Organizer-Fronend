<template>

  <div>
    <header-component></header-component>
    <desk></desk>
  </div>

</template>

<script>
import HeaderComponent from './Common/Header.vue';
import DeskComponent from './Desk/Desk.vue' ;
import ModalComponent from './Modal/Modal.vue' ;

export default {
  components: {
    'header-component': HeaderComponent,
    'modal': ModalComponent,
    'desk': DeskComponent
  }
}
</script>
